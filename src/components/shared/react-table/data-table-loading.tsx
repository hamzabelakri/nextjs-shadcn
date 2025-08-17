import { Loader2 } from 'lucide-react'
import React from 'react'

const DataTableLoading = () => {
  return (
    <div className="flex l items-center justify-center ">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    </div>
  )
}

export default DataTableLoading
