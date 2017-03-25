// TODO evenualy we want to move these templates to the service templates
export module Shape2dTemplates {

  /*
  +--------+
  |        |
  |        |
  +--------+
   */
  export const square: number[][] = [
    [0, 0],
    [0, 120],
    [120, 120],
    [120, 0]
  ];

  /*
  +----------+
  |          |
  |          |
  +----------+

   */
  export const rectangle: number[][] = [
    [0, 0],
    [0, 120],
    [160, 120],
    [160, 0]
  ];

  /*
      +----+
      |    |
  +---+    +---+
  |            |
  +------------+
   */
  export const extrude: Array<number>[] = [
    [0, 0],
    [0, 60],
    [60, 60],
    [60, 120],
    [120, 120],
    [120, 60],
    [180, 60],
    [180, 0]
  ];
}
