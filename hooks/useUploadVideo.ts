import { useCallback } from "react";
import { preSignChunk, uploadChunk, reportChunk, mergeChunks } from "@/lib/api";
import { uint8ArrayToFormFile } from "@/utils";
import * as FileSystem from "expo-file-system";

const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB
const BATCH_SIZE = 3; // 每组3个chunk

// 边读边传单个分片
async function readChunk(
  uri: string,
  chunkIndex: number,
  chunkSize: number
): Promise<Uint8Array> {
  console.log("readChunk", chunkIndex);
  const start = chunkIndex * chunkSize;
  const base64Data = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
    position: start,
    length: chunkSize,
  });
  const binary = atob(base64Data);
  const buffer = new Uint8Array(binary.length);
  for (let j = 0; j < binary.length; j++) {
    buffer[j] = binary.charCodeAt(j);
  }
  return buffer;
}

/**
 * useUploadVideo
 * @param videoUri 本地视频uri
 * @param fileHash 文件hash
 * @param fileSize 文件大小（字节）
 * @returns upload: () => Promise<string>  返回最终文件url
 */
export function useUploadVideo(
  videoUri: string,
  fileHash: string,
  fileSize: number,
  filename: string
) {
  const upload = useCallback(async () => {
    // 1. 预签名
    const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
    const presignRes = await preSignChunk(
      fileHash,
      totalChunks,
      filename || "video.mp4"
    );
    if (presignRes.code !== 200) throw new Error("预签名失败");
    if (presignRes.data.transferType === 1) {
      // 秒传
      return presignRes.data.fileUrl;
    }
    // 2. batch分组上传
    for (
      let batchStart = 0;
      batchStart < totalChunks;
      batchStart += BATCH_SIZE
    ) {
      const batch = [];
      for (let i = 0; i < BATCH_SIZE && batchStart + i < totalChunks; i++) {
        console.log("enter");
        const idx = batchStart + i;
        batch.push(
          (async () => {
            const chunk = await readChunk(videoUri, idx, CHUNK_SIZE);
            const formFile = await uint8ArrayToFormFile(chunk, `chunk-${idx}`);
            await uploadChunk(formFile.uri, fileHash, idx);
            await reportChunk(fileHash, idx);
          })()
        );
      }
      await Promise.all(batch); // 等待本组全部上传完再进入下一组
    }
    // 3. 合并分片
    const mergeRes = await mergeChunks(fileHash, filename || "video.mp4");
    if (mergeRes.code !== 200) throw new Error("合并分片失败");
    return mergeRes.data;
  }, [videoUri, fileHash, fileSize, filename]);

  return { upload };
}
