import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ReactNode } from 'react';


export interface MenuItemType {
title: string;
icon?: ReactNode;
path?: string;
children?: MenuItemType[];
}


export const menuItems: MenuItemType[] = [
{
title: 'Dashboard',
icon: <DashboardIcon />,
path: '/admin'
},
{
title: 'Users',
icon: <PeopleIcon />,
path: '/admin/users'
},
{
title: 'Roles',
icon: <PermIdentityIcon />,
path: '/admin/roles'
},
{
title: 'Settings',
icon: <SettingsIcon />,
children: [
{
title: 'Categories',
path: '/admin/settings/categories',
icon: <ArrowRightIcon />,
},
]
}
];   

// {
// title: 'UI Elements',
// icon: <LayersIcon />,
// children: [
// {
// title: 'Components',
// icon: <FolderIcon />,
// children: [
// {
// title: 'Buttons',
// path: '/admin/ui/buttons',
// icon: <SubdirectoryArrowRightIcon />
// },
// {
// title: 'Cards',
// path: '/admin/ui/cards',
// icon: <SubdirectoryArrowRightIcon />
// },
// {
// title: 'Deep Level Folder',
// icon: <FolderIcon />,
// children: [
// {
// title: 'Level 3 - Option 1',
// path: '/admin/ui/level3/option1',
// icon: <SubdirectoryArrowRightIcon />
// },
// {
// title: 'Level 3 - Option 2',
// path: '/admin/ui/level3/option2',
// icon: <SubdirectoryArrowRightIcon />
// },
// {
// title: 'Level 3 Folder',
// icon: <FolderIcon />,
// children: [
// {
// title: 'Level 4 Item 1',
// path: '/admin/ui/level4/item1',
// icon: <SubdirectoryArrowRightIcon />
// },
// {
// title: 'Level 4 Item 2',
// path: '/admin/ui/level4/item2',
// icon: <SubdirectoryArrowRightIcon />
// }
// ]
// }
// ]
// }
// ]
// }
// ]
// }