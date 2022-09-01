interface PointCloud {
  width: number;
  height: number;
  is_dense: boolean;
  isOrganized: () => boolean;
}

declare const __PCLCore__: Emscripten.Module;
declare const __version__: string;

interface Window {
  __PCLCore__: Module;
}