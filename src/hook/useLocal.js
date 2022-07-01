import React, { useContext } from 'react';

// component
import { AuthContext } from '../context/context';
import en from '../components/helper/en';
import jp from '../components/helper/jp';

const useLocal = () => {
  const {lang} = useContext(AuthContext);
  if(lang == 'en'){
    return en;
  }else if(lang == 'jp'){
    return jp;
  }
}

export default useLocal