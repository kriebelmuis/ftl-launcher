import { useEffect, useState } from "react"
import { Row } from "@tanstack/react-table"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { serverSchema } from "@/validators/ftla/server-schema"
import { RankGraph } from "./server-rank-graph"

interface DataTableMoreInfoProps<TData> {
  open: boolean
  onClose: () => void
  row: Row<TData>
}

export default function DataTableMoreInfo<TData>({
  open,
  onClose,
  row,
}: DataTableMoreInfoProps<TData>) {
  const server = serverSchema.parse(row.original)
  const [mounted, setMounted] = useState(false)

  // Need to delay the rendering of the chart to prevent the
  // over fetching of data from BM api.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <Drawer open={open} onClose={onClose}>
        <DrawerContent
          className="min-h-[65vh] select-all"
          onInteractOutside={onClose}
        >
          <DrawerHeader>
            <DrawerTitle>{server.name}</DrawerTitle>
            <DrawerDescription>
              {server.addr}:{server.gamePort}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex h-[50vh] justify-between">
            <div className="max-w-[50vw] flex-grow bg-red-200 p-4">
              {/* This component fetches from the BM API */}
              {mounted && <RankGraph name={server.name} />}
            </div>
            <div className="max-w-[50vw] flex-grow bg-blue-500">test</div>
          </div>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
