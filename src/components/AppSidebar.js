/**
 * AppSidebar Component
 *
 * Collapsible navigation sidebar with branding, menu items, and toggle controls.
 *
 * Features:
 * - Redux-controlled visibility state
 * - Unfoldable/narrow mode for more screen space
 * - Brand logo with full and narrow variants
 * - Close button for mobile devices
 * - Footer with toggle button
 * - Dark color scheme
 * - Fixed positioning
 *
 * @component
 * @example
 * return (
 *   <AppSidebar />
 * )
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'

import { sygnet } from 'src/assets/brand/sygnet'

import { workfolioLogo } from '../assets/brand/workfolioLogo'

// sidebar nav config
import navigation from '../_nav'
import { useNavigate } from 'react-router-dom'

/**
 * AppSidebar functional component
 *
 * Manages sidebar state with Redux:
 * - sidebarShow: Controls sidebar visibility
 * - sidebarUnfoldable: Controls narrow/wide mode
 *
 * Renders navigation from _nav.js configuration file.
 * Memoized to prevent unnecessary re-renders.
 *
 * @returns {React.ReactElement} Sidebar with navigation
 */
const AppSidebar = () => {
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom d-flex align-items-center justify-content-center py-3">
  <div  style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
  
    onClick={() => navigate("/dashboard")}
  >
    
    {/* Icon */}
    <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #5e5cd1, #5e5cd1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "#fff",
        fontSize: "18px",
      }}
    >
      W
    </div>

    {/* Text */}
    <span
      style={{
        fontSize: "18px",
        fontWeight: "600",
        color: "#e9ecef",
        letterSpacing: "0.5px",
      }}
    >
      Workfolio
    </span>

  </div>

  <CCloseButton
    className="d-lg-none position-absolute end-0 me-2"
    dark
    onClick={() => dispatch({ type: 'set', sidebarShow: false })}
  />
</CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
