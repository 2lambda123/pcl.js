import {
  PointTypesUnion,
  TPointTypesUnion,
  PointTypesIntersection,
  PointXYZ,
  Vector,
  NativeObject,
  PCLHeader,
} from './type';
import { getPointType } from '../../utils';

class Points<T> extends Vector<T> {
  private readonly _PT: TPointTypesUnion;

  constructor(_native: Emscripten.NativeAPI) {
    super(_native);
    this._PT = getPointType(_native, 'Points');
  }

  public get(index: number) {
    const args: number[] = Object.values(this._native.get(index) ?? {});
    return new this._PT(...args) as unknown as T;
  }
}

class PointCloud<
  T extends Partial<PointTypesUnion> = Partial<PointTypesIntersection>,
> extends NativeObject {
  public _native: Emscripten.NativeAPI;

  constructor(
    public readonly _PT: TPointTypesUnion = PointXYZ,
    _native?: Emscripten.NativeAPI,
  ) {
    super();
    this._native = _native ?? new __PCLCore__[`PointCloud${_PT.name}`]();
  }

  get isOrganized(): boolean {
    return this._native.isOrganized();
  }

  get isDense(): boolean {
    return this._native.is_dense;
  }

  set width(v: number) {
    this._native.width = v;
  }

  get width(): number {
    return this._native.width;
  }

  set height(v: number) {
    this._native.height = v;
  }

  get height(): number {
    return this._native.height;
  }

  get header() {
    return new PCLHeader(this._native.header);
  }

  get size(): number {
    return this.points.size;
  }

  get points() {
    return wrapPoints(this._native.points);
  }

  /**
   * Removes all points in a cloud and sets the width and height to 0.
   */
  public clear() {
    this._native.clear();
  }

  /**
   * Resizes the container to contain `count` elements
   * @params count - New size of the point cloud
   * @params pt - The value to initialize the new points with
   */
  public resize(count: number, pt?: T) {
    this._native.resize(count, pt ?? new this._PT());
  }

  /**
   * Insert a new point in the cloud, at the end of the container.
   * @description This breaks the organized structure of the cloud by setting the height to 1!
   * @params pt - The point to insert
   */
  public addPoint(pt: T | null = null) {
    this._native.push_back(pt);
  }

  /**
   * override
   */
  public delete() {
    super.delete();
    this.points.delete();
  }
}

function wrapPointCloud<
  T extends Partial<PointTypesUnion> = Partial<PointTypesIntersection>,
>(_native: Emscripten.NativeAPI) {
  return new PointCloud<T>(getPointType(_native, 'PointCloud'), _native);
}

function wrapPoints<
  T extends Partial<PointTypesUnion> = Partial<PointTypesIntersection>,
>(_native: Emscripten.NativeAPI) {
  return new Points<T>(_native);
}

export { PointCloud, Points, wrapPointCloud, wrapPoints };
export * from './type';
