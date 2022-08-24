import FilterBase from './FilterBase';

class StatisticalOutlierRemoval extends FilterBase {
  constructor(extractRemovedIndices = false) {
    super(new Module.StatisticalOutlierRemoval(extractRemovedIndices));
  }

  public setMeanK(nrK: number) {
    return this.native.setMeanK(nrK);
  }

  public getMeanK(): number {
    return this.native.getMeanK();
  }

  public setStddevMulThresh(stddevMult: number) {
    return this.native.setStddevMulThresh(stddevMult);
  }

  public getStddevMulThresh(): number {
    return this.native.getStddevMulThresh();
  }
}

export default StatisticalOutlierRemoval;
