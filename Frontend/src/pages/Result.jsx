import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../components/Button';
import Progress from '../components/Progress';
import { CardContent, CardHeader, CardTitle } from '../components/cards';
import Card from '../components/cards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { useAuth } from '../components/authContext';

const Results = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const location = useLocation();
 
  // Check if auth is defined before destructuring
  
  const {  scanningDate } = location.state || {}; // Destructure scanning date
  
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    if (location.state && location.state.analysisResult) {
      setAnalysisResult(location.state.analysisResult);
      console.log(location.state.analysisResult);
    }
  }, [location]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  if (!analysisResult || !analysisResult.result) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-800">No skin analysis data available.</p>
      </div>
    );
  }

  const { result } = analysisResult;


  const skinConditions = [
    { name: 'Dark Circles', value: result.dark_circle.value, confidence: result.dark_circle.confidence },
    { name: 'nasolabial_fold', value: result.nasolabial_fold.value, confidence: result.nasolabial_fold.confidence },
    { name: 'Eye Finelines', value: result.eye_finelines.value, confidence: result.eye_finelines.confidence },
    { name: 'Crows Feet', value: result.crows_feet.value, confidence: result.crows_feet.confidence },
    { name: 'Forehead Wrinkle', value: result.forehead_wrinkle.value, confidence: result.forehead_wrinkle.confidence },
    { name: 'Glabella Wrinkle', value: result.glabella_wrinkle.value, confidence: result.glabella_wrinkle.confidence },
    { name: 'Mole', value: result.mole.value, confidence: result.mole.confidence },
    { name: 'Blackhead', value: result.blackhead.value, confidence: result.blackhead.confidence },
    { name: 'Acne', value: result.acne.value, confidence: result.acne.confidence },
    { name: 'Skin Spot', value: result.skin_spot.value, confidence: result.skin_spot.confidence },
    { name: 'Pores (Forehead)', value: result.pores_forehead.value, confidence: result.pores_forehead.confidence },
    { name: 'Pores (Left Cheek)', value: result.pores_left_cheek.value, confidence: result.pores_left_cheek.confidence },
    { name: 'Pores (Right Cheek)', value: result.pores_right_cheek.value, confidence: result.pores_right_cheek.confidence },
    { name: 'Pores (Jaw)', value: result.pores_jaw.value, confidence: result.pores_jaw.confidence },
    { name: 'Eye Pouch', value: result.eye_pouch.value, confidence: result.eye_pouch.confidence },
    { name: 'Left Eyelids', value: result.left_eyelids.value, confidence: result.left_eyelids.confidence },
    { name: 'Right Eyelids', value: result.right_eyelids.value, confidence: result.right_eyelids.confidence },
  ];

  const skinTypeMap = {
    0: 'Oily',
    1: 'Dry',
    2: 'Normal',
    3: 'Combination'
  };

  const getSkinType = () => {
    const skinType = result.skin_type.skin_type;
    return skinTypeMap[skinType] || 'Unknown';
  };

  const calculateOverallSkinConditionPercentage = () => {
    const totalConditions = skinConditions.length;
    const totalPresent = skinConditions.filter(condition => condition.value === '1' || condition.value === 1).length;
    return totalConditions > 0 ? (totalPresent / totalConditions) * 100 : 0;
  };

  const overallConditionPercentage = calculateOverallSkinConditionPercentage();
  const conditionsWithIssues = skinConditions
  .filter(condition => condition.value === 1) // Filter conditions with value 1
  

  const getOverallCondition = () => {
    if (overallConditionPercentage === 0) {
      return { condition: 'Best', percentage: overallConditionPercentage };
    } else if (overallConditionPercentage <= 40) {
      return { condition: 'Better', percentage: overallConditionPercentage };
    } else if (overallConditionPercentage <= 75) {
      return { condition: 'Moderate', percentage: overallConditionPercentage };
    } else {
      return { condition: 'Bad', percentage: overallConditionPercentage };
    }
  };

  const overallCondition = getOverallCondition();
  const productRecommendations = [
    {
      condition: "Dark Circles",
      products: [
        
          {
            title: "The Moms Co. Natural Vita Rich Under Eye Cream for Dark Circles for Women & Men enriched with Chia Seed Oil, Coffee Oil, Vitamines E & B3 with Cooling Massage Roller to Reduce Dark Circles, Puffiness and Fine Lines",
            link:"https://www.amazon.in/Moms-Co-Natural-Puffiness-Vitamins/dp/B07JF5761L/ref=sr_1_3_mod_primary_new?dib=eyJ2IjoiMSJ9.ooCcqrIEz0aJzp0rAdvMVqvmSqtrvYiyxuZ-TPKIZobVGu65oikxcOVCi6XMoW5EB3ek4xJ2o4cjJ67NB24AIGwodJ9QqTSEMVchCO33G82U1I65LVHea0HKb9NlrJQSKZ1_PVpIkPzglJFwQlmm7unZkX2c9to9Me6R_Qv651HxiRYqhahDGIfby6P-mLYffl5_ARPts7wAn83K8bdmDx6eBwWhwCd7RgB9mT_59bON4e17MnB34-6uSCpLnI-gcKTXINaFnsz_vEM1I-oT0xQX0hDGOxPIg6jqCj-YWfo.JEFQHeLsJZH0wICg-1VBoJ2LD1pKSQrr6VlUdqQCfmY&dib_tag=se&keywords=dark+circles+eye+finelines+crows+feet+eye+pouch+left+eyelids+right+eyelids&nsdOptOutParam=true&qid=1728762560&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-3",
            rating: "3.7 out of 5",
            reviews: "2000+",
          },
          {
            title: "Chemist At Play Under Eye Cream with 2% Revital Eye & Quinoa Extract|Reducing Dark Circles, Puffiness, Wrinkles, Crows Feet|Plant-Based Ceramides|100% Vegan|Cooling Gel & Roller for Men & Women",
            link:"https://www.amazon.in/Chemist-Play-Puffiness-Plant-Based-Ceramides/product-reviews/B0CCLHR9TT/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
            rating: "3.7 out of 5",
            reviews: "100+",
          },
          {
            title: "Botanicals Multi-Peptide for Dark Circles and Eye Area",
            link: "https://www.amazon.in/Botanicals-Multi-Peptide-Puffiness-Preservatives-Chemicals/dp/B0CKTVLYPN",
            rating: "4.5 out of 5",
            reviews: "500+",
          },

        
        
        ]
    },
    
    {
      condition: "Eye Finelines",
      products: [
        
          {
            title: "The Moms Co. Natural Vita Rich Under Eye Cream for Dark Circles for Women & Men enriched with Chia Seed Oil, Coffee Oil, Vitamines E & B3 with Cooling Massage Roller to Reduce Dark Circles, Puffiness and Fine Lines",
            link:"https://www.amazon.in/Moms-Co-Natural-Puffiness-Vitamins/dp/B07JF5761L/ref=sr_1_3_mod_primary_new?dib=eyJ2IjoiMSJ9.ooCcqrIEz0aJzp0rAdvMVqvmSqtrvYiyxuZ-TPKIZobVGu65oikxcOVCi6XMoW5EB3ek4xJ2o4cjJ67NB24AIGwodJ9QqTSEMVchCO33G82U1I65LVHea0HKb9NlrJQSKZ1_PVpIkPzglJFwQlmm7unZkX2c9to9Me6R_Qv651HxiRYqhahDGIfby6P-mLYffl5_ARPts7wAn83K8bdmDx6eBwWhwCd7RgB9mT_59bON4e17MnB34-6uSCpLnI-gcKTXINaFnsz_vEM1I-oT0xQX0hDGOxPIg6jqCj-YWfo.JEFQHeLsJZH0wICg-1VBoJ2LD1pKSQrr6VlUdqQCfmY&dib_tag=se&keywords=dark+circles+eye+finelines+crows+feet+eye+pouch+left+eyelids+right+eyelids&nsdOptOutParam=true&qid=1728762560&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-3",
            rating: "3.7 out of 5",
            reviews: "2000+",
          },
          {
            title: "Chemist At Play Under Eye Cream with 2% Revital Eye & Quinoa Extract|Reducing Dark Circles, Puffiness, Wrinkles, Crows Feet|Plant-Based Ceramides|100% Vegan|Cooling Gel & Roller for Men & Women",
            link:"https://www.amazon.in/Chemist-Play-Puffiness-Plant-Based-Ceramides/product-reviews/B0CCLHR9TT/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
            rating: "3.7 out of 5",
            reviews: "100+",
          },
          {
            title: "Botanicals Multi-Peptide for Dark Circles and Eye Area",
            link: "https://www.amazon.in/Botanicals-Multi-Peptide-Puffiness-Preservatives-Chemicals/dp/B0CKTVLYPN",
            rating: "4.5 out of 5",
            reviews: "500+",
          },

        
      
        ]
    },
    {
      condition :"nasolabial_fold",
      products:[
        
          {
            title: "Botanicals Multi-Peptide for Dark Circles and Eye Area",
            link: "https://www.amazon.in/Botanicals-Multi-Peptide-Puffiness-Preservatives-Chemicals/dp/B0CKTVLYPN",
            rating: "4.5 out of 5",
            reviews: "500+",
          },
      
       

        ]

    },
    {
      condition: "Crows Feet",
      products: [
        
          {
            title: "The Moms Co. Natural Vita Rich Under Eye Cream for Dark Circles for Women & Men enriched with Chia Seed Oil, Coffee Oil, Vitamines E & B3 with Cooling Massage Roller to Reduce Dark Circles, Puffiness and Fine Lines",
            link:"https://www.amazon.in/Moms-Co-Natural-Puffiness-Vitamins/dp/B07JF5761L/ref=sr_1_3_mod_primary_new?dib=eyJ2IjoiMSJ9.ooCcqrIEz0aJzp0rAdvMVqvmSqtrvYiyxuZ-TPKIZobVGu65oikxcOVCi6XMoW5EB3ek4xJ2o4cjJ67NB24AIGwodJ9QqTSEMVchCO33G82U1I65LVHea0HKb9NlrJQSKZ1_PVpIkPzglJFwQlmm7unZkX2c9to9Me6R_Qv651HxiRYqhahDGIfby6P-mLYffl5_ARPts7wAn83K8bdmDx6eBwWhwCd7RgB9mT_59bON4e17MnB34-6uSCpLnI-gcKTXINaFnsz_vEM1I-oT0xQX0hDGOxPIg6jqCj-YWfo.JEFQHeLsJZH0wICg-1VBoJ2LD1pKSQrr6VlUdqQCfmY&dib_tag=se&keywords=dark+circles+eye+finelines+crows+feet+eye+pouch+left+eyelids+right+eyelids&nsdOptOutParam=true&qid=1728762560&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-3",
            rating: "3.7 out of 5",
            reviews: "2000+",
          },
          {
            title: "Chemist At Play Under Eye Cream with 2% Revital Eye & Quinoa Extract|Reducing Dark Circles, Puffiness, Wrinkles, Crows Feet|Plant-Based Ceramides|100% Vegan|Cooling Gel & Roller for Men & Women",
            link:"https://www.amazon.in/Chemist-Play-Puffiness-Plant-Based-Ceramides/product-reviews/B0CCLHR9TT/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
            rating: "3.7 out of 5",
            reviews: "100+",
          },
          {
            title: "Botanicals Multi-Peptide for Dark Circles and Eye Area",
            link: "https://www.amazon.in/Botanicals-Multi-Peptide-Puffiness-Preservatives-Chemicals/dp/B0CKTVLYPN",
            rating: "4.5 out of 5",
            reviews: "500+",
          },

        
        
        ]
    },
    {
      condition: "Forehead Wrinkle",
      products: [
        
          {
            title: "Himalaya Anti-Wrinkle Cream For Men/Women With Aloevera & Grapes | Reduce Wrinkles, Fine Lines & Age Spots | Clinically Tested Aha-Rich Formula | No Alcohol-No Parabens | For Normal To Dry Skin| 50G",
            link:"https://www.amazon.in/Himalaya-Herbals-Anti-Wrinkle-Cream/dp/B003OPTXW4/ref=sr_1_3_mod_primary_new?crid=3MXB0EXT7YUC4&dib=eyJ2IjoiMSJ9.5WNJY7sLWv3IhG7e9YutSQP02XVb5Xzq0crC4M2uoOkJVGMD8gATUd5S2fHH2UWaw6PWgiogcxlwp7OGHSMl4-F6Vb78P74_W91af_ypJpKeTfbP0Jzb6Dut3KqtzpLuwmr6X1KWGijuzY0PS1XK_Wsx9Sdep3dn2w2XdG4FFcE1huMcgMFlvw_EHervKU5NI-UH4QhJ7TkcKQLU5G2nug.y692XoE_mtKaRU2mFGPUTIYdtpqZegljNKDVyXrVeP8&dib_tag=se&keywords=Wrinkles%3A%2BForehead%2BWrinkle%2BGlabella%2BWrinkle&qid=1728763908&refinements=p_72%3A1318476031&rnid=1318475031&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=wrinkles%2Bforehead%2Bwrinkle%2Bglabella%2Bwrinkle%2Caps%2C380&sr=8-3&th=1",
            rating: "4.1 out of 5",
            reviews: "800+",
          },
          {
            title: "Neutrogena Rapid Wrinkle Repair Night Moisturizer For Face With Retinol, 29ml",
            link:"https://www.amazon.in/Neutrogena-Rapid-Wrinkle-Repair-Moisturizer/dp/B004D2C4Q4/ref=sr_1_2?dib=eyJ2IjoiMSJ9.4GQ5ARpPs6ydA7uD3sOtIHW-lXiV2gZFLqgyEjE-CnnCOZPmHbWB-_X5sSDA8DUELchYe9TRvWZZ8VtrhBBycy7ztdomSX-AfUUG9HU8Z-PJsqSerPK1g5NNkNp0c4i_lZW5iE3THayuJ66eh8S5keQy1vh3PPE6nZV3Z3v2nyoDB65sKS6zMzvvp96x1kKRuYgT8xbjH_tZnf7z9obfoIzX2ZuZ6qBRObschWbyKMIsCayNY3a5CDP1XYFzHaCqKEeYQx-n28ZN0Jtn5LbqYCcuK9Xw_0seJsuigb-yJI8.oCrciJsxzQu4U0Ux1kC4g77vlL50Pt7P7y6lRPfgwTw&dib_tag=se&keywords=wrinkle&qid=1728764253&sr=8-2&th=1",
            rating: "4.1 out of 5",
            reviews: "2000+",
          },
          {
            title: "Garnier Skin Naturals, Anti-Ageing Cream, Moisturizing, Forming & Smoothing, Wrinkle Lift, 40 g",
            link: "https://www.amazon.in/Garnier-Naturals-Wrinkle-Ageing-Cream/dp/B00791D32U/ref=sr_1_1?dib=eyJ2IjoiMSJ9.4GQ5ARpPs6ydA7uD3sOtIHW-lXiV2gZFLqgyEjE-CnnCOZPmHbWB-_X5sSDA8DUELchYe9TRvWZZ8VtrhBBycy7ztdomSX-AfUUG9HU8Z-PJsqSerPK1g5NNkNp0c4i_lZW5iE3THayuJ66eh8S5keQy1vh3PPE6nZV3Z3v2nyoDB65sKS6zMzvvp96x1kKRuYgT8xbjH_tZnf7z9obfoIzX2ZuZ6qBRObschWbyKMIsCayNY3a5CDP1XYFzHaCqKEeYQx-n28ZN0Jtn5LbqYCcuK9Xw_0seJsuigb-yJI8.oCrciJsxzQu4U0Ux1kC4g77vlL50Pt7P7y6lRPfgwTw&dib_tag=se&keywords=wrinkle&qid=1728764253&sr=8-1&th=1",
            rating: "4.2 out of 5",
            reviews: "700+",
          },

        
        
        ]
    },
    {
      condition: "Glabella Wrinkle",
      products: [
        
          {
            title: "Himalaya Anti-Wrinkle Cream For Men/Women With Aloevera & Grapes | Reduce Wrinkles, Fine Lines & Age Spots | Clinically Tested Aha-Rich Formula | No Alcohol-No Parabens | For Normal To Dry Skin| 50G",
            link:"https://www.amazon.in/Himalaya-Herbals-Anti-Wrinkle-Cream/dp/B003OPTXW4/ref=sr_1_3_mod_primary_new?crid=3MXB0EXT7YUC4&dib=eyJ2IjoiMSJ9.5WNJY7sLWv3IhG7e9YutSQP02XVb5Xzq0crC4M2uoOkJVGMD8gATUd5S2fHH2UWaw6PWgiogcxlwp7OGHSMl4-F6Vb78P74_W91af_ypJpKeTfbP0Jzb6Dut3KqtzpLuwmr6X1KWGijuzY0PS1XK_Wsx9Sdep3dn2w2XdG4FFcE1huMcgMFlvw_EHervKU5NI-UH4QhJ7TkcKQLU5G2nug.y692XoE_mtKaRU2mFGPUTIYdtpqZegljNKDVyXrVeP8&dib_tag=se&keywords=Wrinkles%3A%2BForehead%2BWrinkle%2BGlabella%2BWrinkle&qid=1728763908&refinements=p_72%3A1318476031&rnid=1318475031&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=wrinkles%2Bforehead%2Bwrinkle%2Bglabella%2Bwrinkle%2Caps%2C380&sr=8-3&th=1",
            rating: "4.1 out of 5",
            reviews: "800+",
          },
          {
            title: "Neutrogena Rapid Wrinkle Repair Night Moisturizer For Face With Retinol, 29ml",
            link:"https://www.amazon.in/Neutrogena-Rapid-Wrinkle-Repair-Moisturizer/dp/B004D2C4Q4/ref=sr_1_2?dib=eyJ2IjoiMSJ9.4GQ5ARpPs6ydA7uD3sOtIHW-lXiV2gZFLqgyEjE-CnnCOZPmHbWB-_X5sSDA8DUELchYe9TRvWZZ8VtrhBBycy7ztdomSX-AfUUG9HU8Z-PJsqSerPK1g5NNkNp0c4i_lZW5iE3THayuJ66eh8S5keQy1vh3PPE6nZV3Z3v2nyoDB65sKS6zMzvvp96x1kKRuYgT8xbjH_tZnf7z9obfoIzX2ZuZ6qBRObschWbyKMIsCayNY3a5CDP1XYFzHaCqKEeYQx-n28ZN0Jtn5LbqYCcuK9Xw_0seJsuigb-yJI8.oCrciJsxzQu4U0Ux1kC4g77vlL50Pt7P7y6lRPfgwTw&dib_tag=se&keywords=wrinkle&qid=1728764253&sr=8-2&th=1",
            rating: "4.1 out of 5",
            reviews: "2000+",
          },
          {
            title: "Garnier Skin Naturals, Anti-Ageing Cream, Moisturizing, Forming & Smoothing, Wrinkle Lift, 40 g",
            link: "https://www.amazon.in/Garnier-Naturals-Wrinkle-Ageing-Cream/dp/B00791D32U/ref=sr_1_1?dib=eyJ2IjoiMSJ9.4GQ5ARpPs6ydA7uD3sOtIHW-lXiV2gZFLqgyEjE-CnnCOZPmHbWB-_X5sSDA8DUELchYe9TRvWZZ8VtrhBBycy7ztdomSX-AfUUG9HU8Z-PJsqSerPK1g5NNkNp0c4i_lZW5iE3THayuJ66eh8S5keQy1vh3PPE6nZV3Z3v2nyoDB65sKS6zMzvvp96x1kKRuYgT8xbjH_tZnf7z9obfoIzX2ZuZ6qBRObschWbyKMIsCayNY3a5CDP1XYFzHaCqKEeYQx-n28ZN0Jtn5LbqYCcuK9Xw_0seJsuigb-yJI8.oCrciJsxzQu4U0Ux1kC4g77vlL50Pt7P7y6lRPfgwTw&dib_tag=se&keywords=wrinkle&qid=1728764253&sr=8-1&th=1",
            rating: "4.2 out of 5",
            reviews: "700+",
          },

        
        
        ]
    },
    {
      condition: "Mole",
      products: [
        
          {
            title: "Veentus LCD Screen Display Beauty Mole Removal Sweep Spot Pen",
            link: "https://www.amazon.in/Veentus-Painless-Portable-Equipment-Multicolor/dp/B0B8P24ZK7/",
            rating: "4.2 out of 5",
            reviews: "245",
          },
        
        
        ]
    },
    {
      condition: "Blackhead",
      products: [
        
          {
            title: "Neutrogena Deep Clean Scrub Blackhead Eliminating Daily Scrub For Face, 100g",
            link: "https://www.amazon.in/Neutrogena-Clean-Blackhead-Eliminating-Daily/dp/B00791EDK6/ref=sr_1_2_f3_0o_fs_mod_primary_alm?dib=eyJ2IjoiMSJ9.BsmNBRozUjFDmCdjtd2r8lH3JGAvW5eG3RSK21qY_GwUTq9E-z3QZmXYuqMV_Nq02MHPXG9XHaTzWSabo1v_5iOeO7PWmJJ8mLP-xQhTXbu2poe_dlB3zLiVt2BG8rfLnk-Gl8U41m9wExNnWjcFITkkrY3BLr5NqdX3IlPeD6N58znnaS-IAC8c2IGBq8ELL8RAktFfkgHpU7iaJWYWeAg3omeNHf41vJ4KaSAyEKPRkHJpGb8yWGFtlj51YaZ5sY4p_rGkw6IufICBHeHfHyI7fVvK6dlQxbwMCwsv32E.CdQH8325i-rVXEPvvCjo7bWTcw1lGVAR-WsKZD7_Uoc&dib_tag=se&keywords=blackheads&qid=1728765817&sbo=m6DjfpMzMLDmL8pSMKX8hw%3D%3D&sr=8-2",
            rating: "4.3 out of 5",
            reviews: "500",
          },
          {
            title: "Minimalist 2% Salicylic Acid Serum For Acne, Blackheads & Open Pores | Reduces Excess Oil & Bumpy Texture | BHA Based Exfoliant for Acne Prone or Oily Skin | 30ml",
            link:"https://www.amazon.in/Minimalist-Salicylic-Exfoliant-Blackheads-Exfoliating/dp/B08GG9M863/ref=sr_1_1?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-1",
            rating: "4.1 out of 5",
            reviews: "1400+",
          },
          {
            title: "HipHop Skin Care Cleansing Charcoal Nose Strips (6 Strips), Blackheads, Whiteheads Remover, Pore Cleanser, with Natural Extracts, for Women, All Skin Types",
            link:"https://www.amazon.in/HipHop-Skincare-Charcoal-Blackhead-Remover/dp/B07B2VBCYN/ref=sr_1_4?dib=eyJ2IjoiMSJ9.BsmNBRozUjFDmCdjtd2r8lH3JGAvW5eG3RSK21qY_GwUTq9E-z3QZmXYuqMV_Nq02MHPXG9XHaTzWSabo1v_5iOeO7PWmJJ8mLP-xQhTXbu2poe_dlB3zLiVt2BG8rfLnk-Gl8U41m9wExNnWjcFITkkrY3BLr5NqdX3IlPeD6N58znnaS-IAC8c2IGBq8ELL8RAktFfkgHpU7iaJWYWeAg3omeNHf41vJ4KaSAyEKPRkHJpGb8yWGFtlj51YaZ5sY4p_rGkw6IufICBHeHfHyI7fVvK6dlQxbwMCwsv32E.CdQH8325i-rVXEPvvCjo7bWTcw1lGVAR-WsKZD7_Uoc&dib_tag=se&keywords=blackheads&qid=1728766083&sr=8-4",
            rating: "4.0 out of 5",
            reviews: "900+",
          },
        
       
        ]
    },
    {
      condition: "Acne",
      products: [
        
          {
            title: "Minimalist 2% Salicylic Acid Serum For Acne, Blackheads & Open Pores | Reduces Excess Oil & Bumpy Texture | BHA Based Exfoliant for Acne Prone or Oily Skin | 30ml",
            link:"https://www.amazon.in/Minimalist-Salicylic-Exfoliant-Blackheads-Exfoliating/dp/B08GG9M863/ref=sr_1_1?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-1",
            rating: "4.1 out of 5",
            reviews: "1400+",
          },
          {
            title: "Beardhood Acne Pimple Patch | 72 Hydrocolloid Waterproof Patches | For Active Surface Acne | Absorbs Pimple Overnight, Reduces Excess Oil | For All Skin Types",
            link:"https://www.amazon.in/Beardhood-Hydrocolloid-Waterproof-Patches-Overnight/dp/B09NR4H1NP/ref=sr_1_2?dib=eyJ2IjoiMSJ9.o_kEuqsVk7V3eS9sSttW0h1WhajXDSzeN2jzCcN8XpEseAyb5HmONUbTsmvFFH7HG1nvOn2j_IQf_pto-Bny3GnREK7CAuUcICclJksIAGtbfPw6u_dHkj9mVxVv3WJvccflnGNNom990LzEUaPMfmkwGusVESIgNus-XKLc1SCNUkrC_ZFJmV5uk8Jb3aML4INcDRkQJ1LW8_Ura2HKJosEJAg9jGyv8X-qKlLlyvmLB5JkQ5vVXXdTOJPcYY23pZP0H5JDvT9cJq3n7wcwGFE6wL9_BCLWe3utE_b6RJA.8GnLYXG9NbRXxxgH-sppLnwUk8UK5bRXNbwI5hJjxcg&dib_tag=se&keywords=acne&qid=1728765448&sr=8-2",
            rating: "4.3 out of 5",
            reviews: "4000+",
          },
          {
            title: "The Derma Co 10% Niacinamide Face Serum For Acne Marks & Acne Prone Skin For Unisex, 10ml (Dermaco)",
            link:"https://www.amazon.in/Derma-Co-Niacinamide-Serum-Marks/dp/B0957VWFBG/ref=sr_1_4?dib=eyJ2IjoiMSJ9.o_kEuqsVk7V3eS9sSttW0h1WhajXDSzeN2jzCcN8XpEseAyb5HmONUbTsmvFFH7HG1nvOn2j_IQf_pto-Bny3GnREK7CAuUcICclJksIAGtbfPw6u_dHkj9mVxVv3WJvccflnGNNom990LzEUaPMfmkwGusVESIgNus-XKLc1SCNUkrC_ZFJmV5uk8Jb3aML4INcDRkQJ1LW8_Ura2HKJosEJAg9jGyv8X-qKlLlyvmLB5JkQ5vVXXdTOJPcYY23pZP0H5JDvT9cJq3n7wcwGFE6wL9_BCLWe3utE_b6RJA.8GnLYXG9NbRXxxgH-sppLnwUk8UK5bRXNbwI5hJjxcg&dib_tag=se&keywords=acne&qid=1728765448&sr=8-4",
            rating: "4.1 out of 5",
            reviews: "800+",
          },

        
       
        ]
    },
    {
      condition: "Skin Spot",
      products: [
        
          {
            title: "L'Oreal Paris Brightening Serum, 1% Glycolic Acid, 2% Niacinamide Serum, Visibly Minimizes Spots, Reveals Even Skin Tone, Glycolic Bright Skin, 15ml | L'Oreal Paris",
            link: "https://www.amazon.in/Loreal-LOreal-Paris-Glycolic-Brightening/dp/B0B9QYVGT3",
            rating: "4.1 out of 5",
            reviews: "400+",
          },
          {
            title:"Minimalist 2% Alpha Arbutin Serum for Pigmentation & Dark Spots Removal | Anti-pigmentation Face Serum with Hyaluronic Acid to Remove Blemishes, Acne Marks & Tanning | 30 ml",
            link: "https://www.amazon.in/Minimalist-Arbutin-Pigmentation-Hyaluronic-Blemishes/product-reviews/B08GGDRRQ8/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
            rating: "4.1 out of 5",
            reviews: "900+",
          },
          {
            title:"Conscious Chemist® Pigmentation Removal Cream | 50g | Kojic Acid Cream, Azelaic Acid Cream, Tranexamic Acid & Niacinamide, Anti-Pigmentation, Reduce Dark Spots, Gel Cream, All Skin Types - Trubiom",
            link:"https://www.amazon.in/Conscious-Pigmentation-Lightweight-Tr%C3%A0n%C3%A9xamic-Niacinamide/dp/B09WRS5ZQH/ref=sr_1_3?dib=eyJ2IjoiMSJ9.hHXKQUAo7zN9o4Ovyhu_7DaAnxMmiavNzjJO4P3n4HXhNfwM-SA8Mjf1rhbjB8ZU25ooPSv_QU9G0-RR7CgLlHbsXu9Jyfv7r4yfe4lOXOhtUUa8xaGSEeipWFVRpnTiffR4ttBqUBOWZeAT9zX6asERIS_5m0Wi95csxxCmlBw0U5TDjaLuKX3luGot0TcQcsXOen5LNdZz6k-Fyqd3s7D5TCdasbWQ1gUooBeodeOFmghg-jVkuFOmbxNuUX2tuvgKCl24ZEy46CbxW4HhEXVKXcoWO1JV6WiZx8jZK9o.gTPz7hFGczCQrQ-loU8eiklkpUZ-cmTLJUce9JJiRKI&dib_tag=se&keywords=skin%2Bspots%2Bpigmentation&qid=1728766693&sr=8-3&th=1",
            rating: "4.1 out of 5",
            reviews: "500+",
          },
        ]
    },
    {
      condition: "Pores (Forehead)",
      products: [
        
          {
            title: "Minimalist 2% Salicylic Acid Serum For Acne, Blackheads & Open Pores | Reduces Excess Oil & Bumpy Texture | BHA Based Exfoliant for Acne Prone or Oily Skin | 30ml",
            link:"https://www.amazon.in/Minimalist-Salicylic-Exfoliant-Blackheads-Exfoliating/dp/B08GG9M863/ref=sr_1_1?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-1",
            rating: "4.1 out of 5",
            reviews: "1400+",
          },
          {
            title: "Anua Heartleaf Pore Control Cleansing oil 200 ml",
            link:"https://www.amazon.in/Anua-Heartleaf-Pore-Control-Cleansing/dp/B0BN2PX8V3/ref=sr_1_3?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-3",
            rating: "4.3 out of 5",
            reviews: "2500+",
          },
          {
            title: "Paula's Choice-Skin Perfecting 2% BHA Liquid Salicylic Acid Exfoliant-Facial Exfoliant for Blackheads, Enlarged Pores, Wrinkles, Fine Lines",
            link: "https://www.amazon.in/Choice-SKIN-PERFECTING-Exfoliant-Facial-Blackheads-Lines-1-1oz/dp/B07C5SS6YD/ref=sr_1_9?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-9&th=1",
            rating: "4.3 out of 5",
            reviews: "7000+",
          },

      ]
       
    },
    {
      condition: "Pores (Left Cheek)",
      products: [
        
          {
            title: "Minimalist 2% Salicylic Acid Serum For Acne, Blackheads & Open Pores | Reduces Excess Oil & Bumpy Texture | BHA Based Exfoliant for Acne Prone or Oily Skin | 30ml",
            link:"https://www.amazon.in/Minimalist-Salicylic-Exfoliant-Blackheads-Exfoliating/dp/B08GG9M863/ref=sr_1_1?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-1",
            rating: "4.1 out of 5",
            reviews: "1400+",
          },
          {
            title: "Anua Heartleaf Pore Control Cleansing oil 200 ml",
            link:"https://www.amazon.in/Anua-Heartleaf-Pore-Control-Cleansing/dp/B0BN2PX8V3/ref=sr_1_3?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-3",
            rating: "4.3 out of 5",
            reviews: "2500+",
          },
          {
            title: "Paula's Choice-Skin Perfecting 2% BHA Liquid Salicylic Acid Exfoliant-Facial Exfoliant for Blackheads, Enlarged Pores, Wrinkles, Fine Lines",
            link: "https://www.amazon.in/Choice-SKIN-PERFECTING-Exfoliant-Facial-Blackheads-Lines-1-1oz/dp/B07C5SS6YD/ref=sr_1_9?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-9&th=1",
            rating: "4.3 out of 5",
            reviews: "7000+",
          },

        ],
       
      },
    
    {
      condition: "Pores (Right Cheek)",
      products: [
        
          {
            title: "Minimalist 2% Salicylic Acid Serum For Acne, Blackheads & Open Pores | Reduces Excess Oil & Bumpy Texture | BHA Based Exfoliant for Acne Prone or Oily Skin | 30ml",
            link:"https://www.amazon.in/Minimalist-Salicylic-Exfoliant-Blackheads-Exfoliating/dp/B08GG9M863/ref=sr_1_1?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-1",
            rating: "4.1 out of 5",
            reviews: "1400+",
          },
          {
            title: "Anua Heartleaf Pore Control Cleansing oil 200 ml",
            link:"https://www.amazon.in/Anua-Heartleaf-Pore-Control-Cleansing/dp/B0BN2PX8V3/ref=sr_1_3?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-3",
            rating: "4.3 out of 5",
            reviews: "2500+",
          },
          {
            title: "Paula's Choice-Skin Perfecting 2% BHA Liquid Salicylic Acid Exfoliant-Facial Exfoliant for Blackheads, Enlarged Pores, Wrinkles, Fine Lines",
            link: "https://www.amazon.in/Choice-SKIN-PERFECTING-Exfoliant-Facial-Blackheads-Lines-1-1oz/dp/B07C5SS6YD/ref=sr_1_9?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-9&th=1",
            rating: "4.3 out of 5",
            reviews: "7000+",
          },

        
        
        ]
    },
    {
      condition: "Pores (Jaw)",
      products: [
        
          {
            title: "Minimalist 2% Salicylic Acid Serum For Acne, Blackheads & Open Pores | Reduces Excess Oil & Bumpy Texture | BHA Based Exfoliant for Acne Prone or Oily Skin | 30ml",
            link:"https://www.amazon.in/Minimalist-Salicylic-Exfoliant-Blackheads-Exfoliating/dp/B08GG9M863/ref=sr_1_1?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-1",
            rating: "4.1 out of 5",
            reviews: "1400+",
          },
          {
            title: "Anua Heartleaf Pore Control Cleansing oil 200 ml",
            link:"https://www.amazon.in/Anua-Heartleaf-Pore-Control-Cleansing/dp/B0BN2PX8V3/ref=sr_1_3?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-3",
            rating: "4.3 out of 5",
            reviews: "2500+",
          },
          {
            title: "Paula's Choice-Skin Perfecting 2% BHA Liquid Salicylic Acid Exfoliant-Facial Exfoliant for Blackheads, Enlarged Pores, Wrinkles, Fine Lines",
            link: "https://www.amazon.in/Choice-SKIN-PERFECTING-Exfoliant-Facial-Blackheads-Lines-1-1oz/dp/B07C5SS6YD/ref=sr_1_9?dib=eyJ2IjoiMSJ9.NAx9L-wL169MceIsynU_-AyMRyyDmj9nvyDE3yYRBqzlTW5F0HblMSBzUPIKsBbXs04Ui2SMC49oLmmdDPDlzgewTXHNAeXM3tpQ0OgWHHkG3Kp3l4U8V7VxfSru79mg-I3-k2O8F8TwWlom6bjCGOs--7MBG25r2m2TpOQrBVKzMTQxpvaYaGYHKEuUWhFsEfK6A6ViB2OmR_1N_hF3hiS6NG9r_zyW3CC0Fo2Tjv731_1Fv50v98hoH6CiRQSbhovW9TYLafojrO04XayIXrqOWlHZZV39qexKQtXPTu0.52-Nz7gk4JU_jB_wanlsQ_skJylQgYZGZ6NRRcYGXCQ&dib_tag=se&keywords=pores&qid=1728764692&sr=8-9&th=1",
            rating: "4.3 out of 5",
            reviews: "7000+",
          },

        ],
      },
       
    
    {
      condition: "Eye Pouch",
      products: [
        
          {
            title: "The Moms Co. Natural Vita Rich Under Eye Cream for Dark Circles for Women & Men enriched with Chia Seed Oil, Coffee Oil, Vitamines E & B3 with Cooling Massage Roller to Reduce Dark Circles, Puffiness and Fine Lines",
            link:"https://www.amazon.in/Moms-Co-Natural-Puffiness-Vitamins/dp/B07JF5761L/ref=sr_1_3_mod_primary_new?dib=eyJ2IjoiMSJ9.ooCcqrIEz0aJzp0rAdvMVqvmSqtrvYiyxuZ-TPKIZobVGu65oikxcOVCi6XMoW5EB3ek4xJ2o4cjJ67NB24AIGwodJ9QqTSEMVchCO33G82U1I65LVHea0HKb9NlrJQSKZ1_PVpIkPzglJFwQlmm7unZkX2c9to9Me6R_Qv651HxiRYqhahDGIfby6P-mLYffl5_ARPts7wAn83K8bdmDx6eBwWhwCd7RgB9mT_59bON4e17MnB34-6uSCpLnI-gcKTXINaFnsz_vEM1I-oT0xQX0hDGOxPIg6jqCj-YWfo.JEFQHeLsJZH0wICg-1VBoJ2LD1pKSQrr6VlUdqQCfmY&dib_tag=se&keywords=dark+circles+eye+finelines+crows+feet+eye+pouch+left+eyelids+right+eyelids&nsdOptOutParam=true&qid=1728762560&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-3",
            rating: "3.7 out of 5",
            reviews: "2000+",
          },
          {
            title: "Chemist At Play Under Eye Cream with 2% Revital Eye & Quinoa Extract|Reducing Dark Circles, Puffiness, Wrinkles, Crows Feet|Plant-Based Ceramides|100% Vegan|Cooling Gel & Roller for Men & Women",
            link:"https://www.amazon.in/Chemist-Play-Puffiness-Plant-Based-Ceramides/product-reviews/B0CCLHR9TT/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
            rating: "3.7 out of 5",
            reviews: "100+",
          },
          {
            title: "Botanicals Multi-Peptide for Dark Circles and Eye Area",
            link: "https://www.amazon.in/Botanicals-Multi-Peptide-Puffiness-Preservatives-Chemicals/dp/B0CKTVLYPN",
            rating: "4.5 out of 5",
            reviews: "500+",
          },

        ],
        
    },
    {
      condition: "Left Eyelids",
      products: [
          {
            title: "The Moms Co. Natural Vita Rich Under Eye Cream for Dark Circles for Women & Men enriched with Chia Seed Oil, Coffee Oil, Vitamines E & B3 with Cooling Massage Roller to Reduce Dark Circles, Puffiness and Fine Lines",
            link:"https://www.amazon.in/Moms-Co-Natural-Puffiness-Vitamins/dp/B07JF5761L/ref=sr_1_3_mod_primary_new?dib=eyJ2IjoiMSJ9.ooCcqrIEz0aJzp0rAdvMVqvmSqtrvYiyxuZ-TPKIZobVGu65oikxcOVCi6XMoW5EB3ek4xJ2o4cjJ67NB24AIGwodJ9QqTSEMVchCO33G82U1I65LVHea0HKb9NlrJQSKZ1_PVpIkPzglJFwQlmm7unZkX2c9to9Me6R_Qv651HxiRYqhahDGIfby6P-mLYffl5_ARPts7wAn83K8bdmDx6eBwWhwCd7RgB9mT_59bON4e17MnB34-6uSCpLnI-gcKTXINaFnsz_vEM1I-oT0xQX0hDGOxPIg6jqCj-YWfo.JEFQHeLsJZH0wICg-1VBoJ2LD1pKSQrr6VlUdqQCfmY&dib_tag=se&keywords=dark+circles+eye+finelines+crows+feet+eye+pouch+left+eyelids+right+eyelids&nsdOptOutParam=true&qid=1728762560&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-3",
            rating: "3.7 out of 5",
            reviews: "2000+",
          },
          {
            title: "Chemist At Play Under Eye Cream with 2% Revital Eye & Quinoa Extract|Reducing Dark Circles, Puffiness, Wrinkles, Crows Feet|Plant-Based Ceramides|100% Vegan|Cooling Gel & Roller for Men & Women",
            link:"https://www.amazon.in/Chemist-Play-Puffiness-Plant-Based-Ceramides/product-reviews/B0CCLHR9TT/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
            rating: "3.7 out of 5",
            reviews: "100+",
          },
          {
            title: "Botanicals Multi-Peptide for Dark Circles and Eye Area",
            link: "https://www.amazon.in/Botanicals-Multi-Peptide-Puffiness-Preservatives-Chemicals/dp/B0CKTVLYPN",
            rating: "4.5 out of 5",
            reviews: "500+",
          },

        
        
        ]
      },
  
    {
      condition: "Right Eyelids",
      products: [
        
          {
            title: "The Moms Co. Natural Vita Rich Under Eye Cream for Dark Circles for Women & Men enriched with Chia Seed Oil, Coffee Oil, Vitamines E & B3 with Cooling Massage Roller to Reduce Dark Circles, Puffiness and Fine Lines",
            link:"https://www.amazon.in/Moms-Co-Natural-Puffiness-Vitamins/dp/B07JF5761L/ref=sr_1_3_mod_primary_new?dib=eyJ2IjoiMSJ9.ooCcqrIEz0aJzp0rAdvMVqvmSqtrvYiyxuZ-TPKIZobVGu65oikxcOVCi6XMoW5EB3ek4xJ2o4cjJ67NB24AIGwodJ9QqTSEMVchCO33G82U1I65LVHea0HKb9NlrJQSKZ1_PVpIkPzglJFwQlmm7unZkX2c9to9Me6R_Qv651HxiRYqhahDGIfby6P-mLYffl5_ARPts7wAn83K8bdmDx6eBwWhwCd7RgB9mT_59bON4e17MnB34-6uSCpLnI-gcKTXINaFnsz_vEM1I-oT0xQX0hDGOxPIg6jqCj-YWfo.JEFQHeLsJZH0wICg-1VBoJ2LD1pKSQrr6VlUdqQCfmY&dib_tag=se&keywords=dark+circles+eye+finelines+crows+feet+eye+pouch+left+eyelids+right+eyelids&nsdOptOutParam=true&qid=1728762560&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-3",
            rating: "3.7 out of 5",
            reviews: "2000+",
          },
          {
            title: "Chemist At Play Under Eye Cream with 2% Revital Eye & Quinoa Extract|Reducing Dark Circles, Puffiness, Wrinkles, Crows Feet|Plant-Based Ceramides|100% Vegan|Cooling Gel & Roller for Men & Women",
            link:"https://www.amazon.in/Chemist-Play-Puffiness-Plant-Based-Ceramides/product-reviews/B0CCLHR9TT/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
            rating: "3.7 out of 5",
            reviews: "100+",
          },
          {
            title: "Botanicals Multi-Peptide for Dark Circles and Eye Area",
            link: "https://www.amazon.in/Botanicals-Multi-Peptide-Puffiness-Preservatives-Chemicals/dp/B0CKTVLYPN",
            rating: "4.5 out of 5",
            reviews: "500+",
          },
      ]  
    },
  
  ];
  const filterProductRecommendations = (conditionsWithIssues) => {
    const recommendationsMap = {};

    productRecommendations.forEach(rec => {
        // Check if the condition is among the issues detected
        if (conditionsWithIssues.some(issue => issue.name === rec.condition)) {
            // Initialize the array for this condition if it doesn't exist
            if (!recommendationsMap[rec.condition]) {
                recommendationsMap[rec.condition] = []; // Initialize with an empty array
            }

            // Add products, checking for duplicates
            rec.products.forEach(product => {
                // Check if the product is already in the array for this condition
                const productExists = recommendationsMap[rec.condition].some(existingProduct => 
                    existingProduct.title === product.title
                );

                // Only add the product if it doesn't already exist for the condition
                if (!productExists) {
                    recommendationsMap[rec.condition].push(product); // Add the product if it doesn't exist
                }
            });
        }
    });

    return recommendationsMap; // Returns a hashmap-like structure
};

// Example usage


// Call the function and log the filtered recommendations
const filteredRecommendations = filterProductRecommendations(conditionsWithIssues);
console.log(filteredRecommendations);

const prepareRecommendationsForDB = (recommendationsMap) => {
    const recommendationsArray = [];

    for (const condition in recommendationsMap) {
        recommendationsArray.push({
            condition: { name: condition }, // Store condition as an object
            products: recommendationsMap[condition], // Array of products
            
        });
    }

    return recommendationsArray;
};

// Prepare the data for insertion
const recommendationsToStore = prepareRecommendationsForDB(filteredRecommendations);

// Function to store recommendations
const storeRecommendations = async (recommendations) => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('https://my-app2-ubnu.onrender.com//api2/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ recommendations }),
        });

        if (!response.ok) {
            throw new Error('Failed to store recommendations');
        }

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Error storing recommendations:', error);
    }
};

// Store the recommendations
storeRecommendations(recommendationsToStore);





  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-900 dark:to-indigo-900 min-h-screen p-4 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
        <img
          src=""
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />

        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <Link to="/Dashboard" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <Button variant="outline" size="icon" onClick={toggleDarkMode} className="bg-white dark:bg-gray-800">
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-600" />}
            </Button>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200"
          >
            Your Skin Analysis Results
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-800 dark:text-gray-200">Overall Skin Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-300">Skin Type</p>
                    <p className="text- sm:text-3xl font-bold text-blue-600 dark:text-blue">{getSkinType()}</p>
                  </div>
                        {scanningDate && (
                      <div>
                          <p className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-300"> ScanningDate</p>
                          <p>{new Date(scanningDate).toLocaleString()}</p> {/* Format the date for readability */}
                      </div>
                  )}
                  <div>
                    <p className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-300">Skin Age</p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{result.skin_age?.value || 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-300">Overall Skin Condition</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{overallCondition.condition} ({overallCondition.percentage.toFixed(2)}%)</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-800 dark:text-gray-200">Skin Conditions</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  *Value indicates presence (1) or absence (0) of the condition.
                  Confidence indicates the accuracy of the detected condition (0 to 1 scale).
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skinConditions.map((condition, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{condition.name}</span>
                        <span className="text-blue-600 dark:text-blue-400">{condition.value} ({(condition.confidence * 100).toFixed(2)}% confidence)</span>
                      </div>
                      <Progress 
                        value={condition.value === '1' || condition.value === 1 ? 100 : 0} 
                        className="h-2 bg-gray-200 dark:bg-gray-700" 
                        indicatorClassName="bg-blue-600 dark:bg-blue-400"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 space-y-6">
                  <AnimatePresence>
                    {skinConditions.map((condition, index) => (
                      (condition.value === '1' || condition.value === 1) && (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                         <Card className="bg-gray-50 dark:bg-gray-700 shadow-md">
                          <CardHeader>
                            <CardTitle className="text-lg sm:text-xl text-gray-800 dark:text-gray-200">{condition.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">Confidence: {(condition.confidence * 100).toFixed(2)}%</p>
                            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Recommended Products:</h4>
                            <Tabs defaultValue="amazon" className="w-full">
                              <TabsList className="grid w-full grid-cols-1 mb-4">
                                <TabsTrigger value="amazon" className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 flex items-center justify-center">
                                  <img
                                  src="https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png"
                                    alt="Amazon"
                                    className="w-9 h-9 mr-8 "
                                  />
                                  Amazon
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="amazon">
                                <ul className="space-y-4">
                                  {productRecommendations
                                    .find(item => item.condition === condition.name)
                                    ?.products.map((product, idx) => (
                                      <li key={idx} className="bg-white dark:bg-gray-600 p-4 rounded-md shadow">
                                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">{product.title}</a>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                          Rating: {product.rating}
                                          <br />
                                          Reviews: {product.reviews}
                                        </p>
                                        <div className="flex items-center mt-2">
                                          {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < parseInt(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                          ))}
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                              </TabsContent>
                            </Tabs>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Button onClick={() => window.location.reload()} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">Re-Analyze Skin</Button>
                </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Results;