export interface PDFNode {
    pageSize: {
      height: number;
      width: number;
    };
    y: number;
    margin: [number, number, number, number];
  }
  
  export type PageBreakFunction = (
    currentNode: PDFNode,
    followingNodesOnPage: PDFNode[],
    nodesOnNextPage: PDFNode[],
    previousNodesOnPage: PDFNode[]
  ) => 'before' | null;
  
  export type PageBreak = boolean | 'before' | 'after' | 'avoid' | PageBreakFunction;