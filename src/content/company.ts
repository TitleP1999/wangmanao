// Public company facts transcribed from wangmanao.com. Review with the client before launch.
export const company = {
  name: "บริษัท วังมะนาวเกษตรภัณฑ์ จำกัด",
  englishName: "WANGMANAO KASETPAN",
  address: "26 หมู่ 5 ตำบลวังมะนาว อำเภอปากท่อ จังหวัดราชบุรี 70140",
  phone: "032-240239",
  email: "info@wangmanao.com",
  hours: "ทุกวัน 08:00 – 17:00 น.",
  line: "https://lin.ee/2EOFCbhct",
  facebook:
    "https://www.facebook.com/บริษัท-วังมะนาวเกษตรภัณฑ์-จำกัด-1452553208373669/",
  map:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("บริษัท วังมะนาวเกษตรภัณฑ์ จำกัด ราชบุรี"),
};
export const navigation = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about/", label: "เกี่ยวกับเรา" },
  { href: "/products/", label: "สินค้าและบริการ" },
  { href: "/partners/", label: "พันธมิตรของเรา" },
  { href: "/contact/", label: "ติดต่อเรา" },
];
export const categories = [
  {
    id: "raw",
    name: "วัตถุดิบอาหารสัตว์",
    en: "FEED INGREDIENTS",
    image: "/images/corn.png",
    description:
      "ข้าวโพดเม็ด ข้าวโพดป่น รำละเอียด กากถั่วเหลือง และวัตถุดิบสำหรับผสมอาหารสัตว์",
    items: [
      "ข้าวโพดเม็ด ตราไก่งาม",
      "เกล็ดข้าวโพด ตราเกล็ดทอง 111 / 222",
      "ข้าวเปลือก ตราไก่งาม 888 / 999",
      "รำละเอียด รำสกัด และรำข้าวสาลี",
      "กากถั่วเหลือง และถั่วอบ",
    ],
  },
  {
    id: "livestock",
    name: "อาหารสัตว์บก",
    en: "LIVESTOCK FEED",
    image: "/images/livestock.png",
    description:
      "อาหารสำเร็จรูปสำหรับไก่ สุกร เป็ด และโค จากแบรนด์ที่บริษัทเป็นตัวแทนจำหน่าย",
    items: ["อาหารไก่", "อาหารสุกร", "อาหารเป็ด", "อาหารโค"],
  },
  {
    id: "aquatic",
    name: "อาหารสัตว์น้ำ",
    en: "AQUACULTURE FEED",
    image: "/images/aquatic.png",
    description:
      "อาหารสำหรับปลากินพืช ปลาดุก และปลาสลิด ตอบโจทย์การเลี้ยงสัตว์น้ำ",
    items: ["อาหารปลากินพืช", "อาหารปลาดุก", "อาหารปลาสลิด"],
  },
  {
    id: "pet",
    name: "อาหารสัตว์เลี้ยง",
    en: "PET FOOD & SUPPLIES",
    image: "/images/pet.png",
    description:
      "อาหารสุนัข อาหารแมว และอุปกรณ์สัตว์เลี้ยง สำหรับเพื่อนตัวเล็กของคุณ",
    items: ["อาหารสุนัข", "อาหารแมว", "อุปกรณ์สัตว์เลี้ยง"],
  },
  {
    id: "rice",
    name: "ข้าวสารและสินค้าอื่น ๆ",
    en: "RICE & MORE",
    image: "/images/rice.png",
    description:
      "ข้าวสารตราฉัตร ตราไท ตราแม่ศรี และตราแม่ไก่แจ้ พร้อมสินค้าเกษตรอื่น ๆ",
    items: [
      "ข้าวสารตราฉัตร",
      "ข้าวสารตราไท",
      "ข้าวสารตราแม่ศรี",
      "ข้าวสารตราแม่ไก่แจ้",
    ],
  },
];
export const partners = [
  { name: "CPF", image: "/images/cpf.png" },
  { name: "BETAGRO", image: "/images/betagro.png" },
  { name: "MARS", image: "/images/mars.png" },
  { name: "TVO", image: "/images/tvo.png" },
  { name: "THAI FOODS", image: "/images/thaifoods.png" },
  { name: "BOK DOK", image: "/images/bokdok.png" },
];
export const history = [
  {
    year: "2541",
    title: "จุดเริ่มต้นของวังมะนาว",
    description:
      "17 มิถุนายน 2541 นายเสนีย์และนางสันทนา แก้วพิจิตร จดทะเบียนพาณิชย์ในนามร้านวังมะนาวเกษตรภัณฑ์ เริ่มต้นจากธุรกิจครอบครัวและทีมงาน 3 คน",
  },
  {
    year: "เติบโต",
    title: "เคียงข้างเกษตรกรและธุรกิจอาหารสัตว์",
    description:
      "ขยายการจำหน่ายวัตถุดิบและอาหารสัตว์ พร้อมพัฒนาการคัดแยกและบรรจุสินค้าตราไก่งามและเกล็ดทอง",
  },
  {
    year: "2563",
    title: "ก้าวสู่สำนักงานใหญ่แห่งใหม่",
    description:
      "ย้ายสำนักงานใหญ่มายังเลขที่ 26 หมู่ 5 ตำบลวังมะนาว อำเภอปากท่อ จังหวัดราชบุรี เพื่อรองรับการดำเนินงานของบริษัท",
  },
];
