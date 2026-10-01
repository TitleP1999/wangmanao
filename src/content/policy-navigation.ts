export const policyDefinitions = [
  {
    slug: "labor-human-rights",
    title: "การปฏิบัติด้านแรงงานและสิทธิมนุษยชน",
    category: "PEOPLE & HUMAN RIGHTS",
  },
  {
    slug: "social-responsibility",
    title: "ความรับผิดชอบต่อสังคม",
    category: "SOCIAL RESPONSIBILITY",
  },
  {
    slug: "employee-confidentiality",
    title: "การรักษาความลับของข้อมูลพนักงาน",
    category: "EMPLOYEE CONFIDENTIALITY",
  },
  {
    slug: "work-from-home",
    title: "การรับงานไปทำที่บ้าน",
    category: "WORK FROM HOME",
  },
  { slug: "land-rights", title: "สิทธิถือครองที่ดิน", category: "LAND RIGHTS" },
  {
    slug: "biodiversity",
    title: "ความหลากหลายทางชีวภาพและสิ่งแวดล้อม",
    category: "BIODIVERSITY & ENVIRONMENT",
  },
  {
    slug: "business-ethics",
    title: "จรรยาบรรณในการดำเนินธุรกิจ",
    category: "BUSINESS ETHICS",
  },
] as const;

export const policyNavigation = policyDefinitions.map((item) => ({
  ...item,
  href: "/policies/" + item.slug + "/",
}));
