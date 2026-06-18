import { CreateButton } from "@/components/refine-ui/buttons/create"
import { ShowButton } from "@/components/refine-ui/buttons/show"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ClassDetails } from "@/types"
import { useTable } from "@refinedev/react-table"
import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

const ClassesList = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('')

    const searchFilters = searchQuery ? [
        { field: 'name', operator: 'contains' as const, value: searchQuery },
        { field: 'description', operator: 'contains' as const, value: searchQuery }
    ] : []

    const classTable = useTable<ClassDetails>({
        columns: useMemo<ColumnDef<ClassDetails>[]>(() => [
            {
                id: 'bannerUrl',
                accessorKey: 'bannerUrl',
                size: 200,
                header: () => <p className="column-title">Banner</p>,
                cell: ({ getValue }) => <span className="text-foreground"><img src={getValue<string>()}></img></span>,
                filterFn: 'includesString'
            },
            {
                id: 'name',
                accessorKey: 'name',
                size: 200,
                header: () => <p className="column-title">Name</p>,
                cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
                filterFn: 'includesString'
            },
            {
                id: 'status',
                accessorKey: 'status',
                size: 300,
                header: () => <p className="column-title">Status</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2"><Badge>{getValue<string>()}</Badge></span>,
            },
            {
                id: 'description',
                accessorKey: 'description',
                size: 300,
                header: () => <p className="column-title">Description</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
            },
            {
                id: 'subject',
                accessorKey: 'subject',
                size: 300,
                header: () => <p className="column-title">Subject</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
            },
            {
                id: 'teacher',
                accessorKey: 'teacher',
                size: 300,
                header: () => <p className="column-title">Teacher</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
            },
            {
                id: 'capacity',
                accessorKey: 'capacity',
                size: 300,
                header: () => <p className="column-title">Capacity</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
            },
            {
                id: 'details',
                size: 140,
                header: () => <p className="column-title">Details</p>,
                cell: ({ row }) => <ShowButton resource="classes" recordItemId={row.original.id} variant="outline" size="sm"> View</ShowButton >
            }
        ], []),
        refineCoreProps: {
            resource: 'classes',
            pagination: {
                pageSize: 10, mode: 'server'
            },
            filters: {
                permanent: [...searchFilters]
            },
            sorters: {
                initial: [
                    { field: 'id', order: 'asc' }
                ]
            },
        }
    })

    return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title">Classes</h1>
            <div className="intro-row">
                <p>Quick access to essential metrics and management tools.</p>
                <div className="actions-row">
                    <div className="search-field">
                        <Search className="search-icon" />
                        <Input
                            type="text"
                            placeholder="Search by name ..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <CreateButton />
                </div>
            </div>

            <DataTable table={classTable} />
        </ListView>
    )
}

export default ClassesList