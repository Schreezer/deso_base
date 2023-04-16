// import React from 'react';
// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { makeStyles } from '@material-ui/core/styles';
// import { Dashboard, ShoppingCart, People } from '@material-ui/icons';

// const useStyles = makeStyles((theme) => ({
//   sidebar: {
//     height: '100vh',
//     paddingTop: theme.spacing(2),
//   },
// }));

// const Sidebar = () => {
//   const classes = useStyles();

//   const menuItems = [
//     {
//       label: 'Dashboard',
//       icon: <Dashboard />,
//       path: '/',
//     },
//     {
//       label: 'Products',
//       icon: <ShoppingCart />,
//       path: '/products',
//     },
//     {
//       label: 'Customers',
//       icon: <People />,
//       path: '/customers',
//       subMenuItems: [
//         {
//           label: 'All Customers',
//           path: '/customers/all',
//         },
//         {
//           label: 'New Customers',
//           path: '/customers/new',
//         },
//       ],
//     },
//   ];

//   return (
//     <ProSidebar className={classes.sidebar}>
//       <Menu iconShape="square">
//         {menuItems.map((item) => (
//           <MenuItem key={item.path} icon={item.icon}>
//             {item.label}
//           </MenuItem>
//         ))}
//         {menuItems
//           .filter((item) => item.subMenuItems)
//           .map((item) => (
//             <SubMenu key={item.path} title={item.label} icon={item.icon}>
//               {item.subMenuItems.map((subItem) => (
//                 <MenuItem key={subItem.path} path={subItem.path}>
//                   {subItem.label}
//                 </MenuItem>
//               ))}
//             </SubMenu>
//           ))}
//       </Menu>
//     </ProSidebar>
//   );
// };

// export default Sidebar;
