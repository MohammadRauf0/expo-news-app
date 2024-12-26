import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react";

export const useNewsCountry = () => {
  const [newsCountries, setNewsCountry] = useState(CountryList);

  const toggleNewsCountry = useCallback((id: number) => {
    setNewsCountry((prevNewsCountry) =>{
      return prevNewsCountry.map((item, index) => {
        if (index === id) {
          return {
            ...item,
            selected: !item.selected,
          }
        }
        return item;
      })
    })
  }, [setNewsCountry]);

  return {
    newsCountries,
    toggleNewsCountry,
  }
}