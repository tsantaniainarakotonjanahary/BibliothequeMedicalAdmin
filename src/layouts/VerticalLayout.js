// ** React Imports
import { Outlet } from 'react-router-dom';
import React,{useEffect} from 'react';

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout';

// ** Menu Items Array
import navigation from '@src/navigation/vertical';
import navigationAdmin from '@src/navigation/vertical/indexAdmin'

const VerticalLayout = props => {

  console.log("BLA BLA BLA BLA BLA");
  return (
    <Layout menuData = { localStorage.getItem("userData").role !== "utilisateur" ? navigation : navigationAdmin } {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
