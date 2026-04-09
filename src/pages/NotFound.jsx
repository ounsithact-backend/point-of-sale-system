import React from "react"

function NotFound() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center", // រុញឱ្យចំកណ្តាលផ្ដេក
      alignItems: "center",     // រុញឱ្យចំកណ្តាលបញ្ឈរ
      height: "100vh",          // កម្ពស់ពេញអេក្រង់ Browser
      flexDirection: "column",  // រៀបតាមជួរឈរ (បើមានអក្សរច្រើនជួរ)
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#555"
    }}>
      <div>404 - Not Found</div>
    </div>
  )
}

export default NotFound