'use client'

import { ColumnDef } from "@tanstack/react-table";

export type eachChat = {
  title: string,
  latestMessage: string,
  other_name: string
}

export const columns: ColumnDef<eachChat>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'latestMessage',
    header: 'Message'
  },
  {
    accessorKey: 'other_name',
    header: 'Name'
  }
]