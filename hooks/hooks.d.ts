interface RequestConfig {
  url: string,
  data?: RequestInit
}

interface ReadFileResponse {
  status: number,
  statusText: string,
  promise?: Promise<string>
}

type FilePrefix = "B" | "KB" | "MB" | "GB"