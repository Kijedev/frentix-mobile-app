export type Bank = {
  id: string;
  order: number;
  title: string;
  categories: string[];
  route: string;
  url: string;
  ticker: string;
};

// const BASE_URL = "https://api.nigerianbanklogos.xyz";
const BASE_URL = "https://supermx1.github.io/nigerian-banks-api/data.json";

/* GET ALL BANKS */
export const getBanks = async (): Promise<Bank[]> => {
  try {
    const response = await fetch(BASE_URL);
    const data: Bank[] = await response.json();

    // keep only real banks
    const banks = data.filter((bank) =>
      bank.categories.includes("Bank")
    );

    return banks;
  } catch (error) {
    console.log("Error fetching banks:", error);
    return [];
  }
};