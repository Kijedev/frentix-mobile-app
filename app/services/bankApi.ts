export type Bank = {
  name: string;
  slug: string;
};
const BASE_URL = "https://supermx1.github.io/nigerian-banks-api/data.json"
// const BASE_URL = "https://api.nigerianbanklogos.xyz";
const LOGO_URL = "https://api.nigerianbanklogos.xyz"

/* GET ALL BANKS */
export const getBanks = async (): Promise<Bank[]> => {
  try {
    const response = await fetch(BASE_URL);

    const result = await response.json();

    return result.data; // API returns { data: [] }
  } catch (error) {
    console.log("Error fetching banks:", error);
    return [];
  }
};

/* GET BANK LOGO */
export const getBankLogo = (slug: string) => {
  return `${LOGO_URL}/logo/${slug}`;
};