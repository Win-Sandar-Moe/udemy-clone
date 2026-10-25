/*
  private UUID courseId;
    private String title;
    private String description;
    private BigDecimal fees;
    private String imageBase64;
    private String teacherName;
    private String categoryName;
 */

export interface CourseInfoDto{
    courseId:string;
    title:string;
    description:string;
    fees:number;
    imageBase64:string;
    teacherName:string;
    categoryName:string;
}