import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState  = {
  menu: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "LayoutDashboardIcon", // dashboard icon ✅
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
    {
      title: "Services",
      url: "/services",
      icon: "HammerIcon", // something representing services/tools
      items: [{ title: "Services", url: "/services" }],
    },
    {
      title: "SEO",
      url: "/seo",
      icon: "BarChartIcon", // SEO/statistics/analytics
      items: [{ title: "SEO", url: "/seo" }],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: "Settings2", // settings gear
      items: [
        { title: "General", url: "/settings/general" },
        { title: "Billing", url: "/settings/billing" },
        {
          title: "Security",
          url: "/settings/security",
          items: [
            { title: "Password", url: "/settings/security/password" },
            { title: "Two-Factor Auth", url: "/settings/security/2fa" },
          ],
        },
      ],
    },
  ],


  activeMenu : {},
}


const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setActiveMenu: (state, action ) => {
      state.activeMenu = action.payload
    },
  },
})

export const {setActiveMenu} = sidebarSlice.actions
export default sidebarSlice.reducer
