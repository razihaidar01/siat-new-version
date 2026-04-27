import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

let ffmpegInstance: FFmpeg | null = null;
let loadingPromise: Promise<FFmpeg> | null = null;

const CORE_VERSION = "0.12.6";
const BASE_URL = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/umd`;

/**
 * Lazy-load a single shared ffmpeg.wasm instance.
 * Loads core JS + wasm via blob URLs so cross-origin isolation isn't required.
 */
async function getFFmpeg(onLog?: (msg: string) => void): Promise<FFmpeg> {
  if (ffmpegInstance) return ffmpegInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const ffmpeg = new FFmpeg();
    if (onLog) ffmpeg.on("log", ({ message }) => onLog(message));

    await ffmpeg.load({
      coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    ffmpegInstance = ffmpeg;
    return ffmpeg;
  })();

  return loadingPromise;
}

export interface CompressOptions {
  /** Target max long-edge resolution in px. Default 720. */
  maxHeight?: number;
  /** CRF (quality). Lower = better quality, bigger file. 23-30 is a sane range. Default 28. */
  crf?: number;
  /** Audio bitrate. Default 96k. */
  audioBitrate?: string;
  onProgress?: (ratio: number) => void;
  onLog?: (msg: string) => void;
}

/**
 * Compress a video in the browser using ffmpeg.wasm.
 * Re-encodes to web-optimized H.264 MP4 with AAC audio, scaled to maxHeight,
 * and faststart-flagged for instant playback.
 *
 * Returns a new File. If the result ends up larger than the original
 * (already-compressed input), returns the original file untouched.
 */
export async function compressVideo(input: File, opts: CompressOptions = {}): Promise<File> {
  const { maxHeight = 720, crf = 28, audioBitrate = "96k", onProgress, onLog } = opts;

  const ffmpeg = await getFFmpeg(onLog);

  if (onProgress) {
    ffmpeg.on("progress", ({ progress }) => {
      const r = Math.max(0, Math.min(1, progress));
      onProgress(r);
    });
  }

  const inputName = "input" + (input.name.match(/\.[a-z0-9]+$/i)?.[0] ?? ".mp4");
  const outputName = "output.mp4";

  await ffmpeg.writeFile(inputName, await fetchFile(input));

  // -vf scale: keep aspect, cap height, ensure even dims (libx264 requirement)
  // -movflags +faststart: web-streamable
  // -preset veryfast: balance speed/size for browser CPU
  await ffmpeg.exec([
    "-i", inputName,
    "-vf", `scale='if(gt(ih,${maxHeight}),trunc(iw*${maxHeight}/ih/2)*2,iw)':'if(gt(ih,${maxHeight}),${maxHeight},ih)'`,
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", String(crf),
    "-c:a", "aac",
    "-b:a", audioBitrate,
    "-movflags", "+faststart",
    "-y",
    outputName,
  ]);

  const data = await ffmpeg.readFile(outputName);
  // Best-effort cleanup
  try { await ffmpeg.deleteFile(inputName); } catch {}
  try { await ffmpeg.deleteFile(outputName); } catch {}

  const u8 = data as Uint8Array;
  // BlobPart accepts ArrayBuffer; copy into a tight ArrayBuffer to satisfy types
  const buffer = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength) as ArrayBuffer;
  const compressedSize = u8.byteLength;

  // If compression made it bigger (already-tiny clip), return original
  if (compressedSize >= input.size) {
    return input;
  }

  const baseName = input.name.replace(/\.[a-z0-9]+$/i, "");
  return new File([buffer], `${baseName}.compressed.mp4`, { type: "video/mp4" });
}

/** Read video duration (seconds) by loading metadata in a hidden video element. */
export function readVideoDuration(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = url;
    v.onloadedmetadata = () => {
      const d = isFinite(v.duration) ? Math.round(v.duration) : null;
      URL.revokeObjectURL(url);
      resolve(d);
    };
    v.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
  });
}
