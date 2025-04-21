
function getGapjaIndex(year, month, day) {
  const baseDate = new Date(1984, 0, 1); // 1984-01-01 is known 갑자일
  const inputDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((inputDate - baseDate) / (1000 * 60 * 60 * 24));
  return diffDays % 60;
}

function getDayGanji(index) {
  const gan = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
  const ji = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
  return gan[index % 10] + ji[index % 12];
}

function getHourGanji(dayGan, hour, region = "대한민국") {
  const gan = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
  const ji = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
  const stemIndex = gan.indexOf(dayGan);
  let correctedHour = hour + 0.5; // default +30min
  if (region === "중국") correctedHour = hour;

  const branchIndex = Math.floor((correctedHour + 1) / 2) % 12;
  const stemHourIndex = (stemIndex * 2 + branchIndex) % 10;
  return gan[stemHourIndex] + ji[branchIndex];
}

function getYearGanji(year) {
  const baseIndex = (year - 1984 + 60) % 60;
  return getDayGanji(baseIndex);
}

function getMonthBranchByIpjeol(month, day) {
  const table = {
    1: { d: 6, b: "丑" }, 2: { d: 4, b: "寅" }, 3: { d: 6, b: "卯" }, 4: { d: 5, b: "辰" },
    5: { d: 6, b: "巳" }, 6: { d: 6, b: "午" }, 7: { d: 7, b: "未" }, 8: { d: 8, b: "申" },
    9: { d: 8, b: "酉" }, 10: { d: 8, b: "戌" }, 11: { d: 7, b: "亥" }, 12: { d: 7, b: "子" }
  };
  const m = table[month] || { d: 6, b: "丑" };
  return day < m.d ? table[(month + 10) % 12 + 1].b : m.b;
}
