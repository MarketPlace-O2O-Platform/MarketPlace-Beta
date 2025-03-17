const categoryMap: Record<string, string> = {
    "전체": "",
    "주점": "ALCOHOL",
    "한식": "KOREAN",
    "아시안": "ASIAN",
    "일식": "JAPANESE",
    "양식": "AMERICAN",
    "기타": "ETC"
}

export const categories = Object.keys(categoryMap)

export default categoryMap