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
  { href: "/policies/", label: "นโยบายบริษัท" },
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
export type Partner = {
  name: string;
  image?: string;
  kind?: "cooperative";
};

export const partners: Partner[] = [
  { name: "TVO", image: "/images/tvo.png" },
  {
    name: "บริษัท ธนากรผลิตภัณฑ์น้ำมันพืช จำกัด",
    image: "/images/thanakorn.png",
  },
  { name: "CPF", image: "/images/cpf.png" },
  { name: "BETAGRO", image: "/images/betagro.png" },
  { name: "TFG · Thai Foods Group", image: "/images/thaifoods.png" },
  { name: "PCG", image: "/images/pcg.png" },
  { name: "MARS", image: "/images/mars.png" },
  { name: "BOK DOK", image: "/images/bokdok.png" },
  { name: "ข้าวตราฉัตร", image: "/images/chat-rice.jpg" },
  { name: "ข้าวตราไทไท", image: "/images/thai-thai.jpg" },
  { name: "ตราผึ้ง", image: "/images/bee.png" },
  { name: "กุ๊ก · COOK", image: "/images/cook.png" },
  { name: "ตราองุ่น", image: "/images/grape.png" },
  { name: "King Rice Oil Group", image: "/images/king-rice.png" },
  { name: "Cargill Siam", image: "/images/partners/cargill.webp" },
  { name: "Thai Union Feedmill", image: "/images/partners/tuf.webp" },
  { name: "SPM", image: "/images/partners/spm.webp" },
  { name: "APM" },
  { name: "Siam Agri Supply Co., Ltd.", image: "/images/partners/sas.webp" },
  { name: "Petpal Products", image: "/images/partners/petpal.webp" },
  { name: "Greatest Pet Care", image: "/images/partners/greatest.webp" },
  { name: "บริษัท ไทยธรรมดี จำกัด" },
  { name: "มารวยฟีด" },
  { name: "ซันฟีด", image: "/images/partners/sunfeed.webp" },
  { name: "ยูไนเต็ด ฟีดมิลล์", image: "/images/partners/united.webp" },
  { name: "Centaco", image: "/images/partners/centaco.webp" },
  { name: "C&C Eggland Co., Ltd." },
  { name: "Thai Inaba Foods Co., Ltd.", image: "/images/partners/inaba.webp" },
  { name: "บริษัท รุ่งเรืองผล จำกัด" },
  { name: "สหกรณ์โคนม เนินดินแดง", kind: "cooperative" },
  { name: "สหกรณ์โคนม ไทย-เดนมาร์ค พัฒนานิคม", kind: "cooperative" },
  { name: "สหกรณ์โคนม พัฒนานิคม", kind: "cooperative" },
  { name: "สหกรณ์โคนมมหาสารคาม", kind: "cooperative" },
  { name: "สหกรณ์โคนมศรีสะเกษ", kind: "cooperative" },
  { name: "สหกรณ์โคนมโคกก่อ", kind: "cooperative" },
  { name: "สหกรณ์ไก่ไข่ เชียงใหม่-ลำพูน", kind: "cooperative" },
  { name: "สหกรณ์โคนม รัตนบุรี", kind: "cooperative" },
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
