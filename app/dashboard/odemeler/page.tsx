"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getAllOrders } from "@/redux/actions/paymentActions"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, CreditCard, Calendar, User, Hash, X, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { SimplePagination } from "@/components/common/SimplePagination"

const ITEMS_PER_PAGE = 10

export default function OdemelerPage() {
    const dispatch = useAppDispatch()
    const { allOrders, loading } = useAppSelector((state) => state.paymentManagement)

    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState(1)

    const clearFilters = () => {
        setSearchTerm("")
        setStatusFilter("all")
        setCurrentPage(1)
    }

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])

    const filteredOrders = allOrders?.filter((order: any) => {
        const matchesSearch =
            order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || order.status === statusFilter

        return matchesSearch && matchesStatus
    }) || []

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Tamamlandı</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Beklemede</Badge>
            case "cancelled":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">İptal Edildi</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Ödeme Yönetimi</h2>
                    <p className="text-muted-foreground">
                        Sistemdeki tüm ödemeleri ve siparişleri takip edin
                    </p>
                </div>
            </div>

            <Card className="border-none shadow-none bg-transparent">
                <CardHeader>
                    <CardTitle>Ödemeler</CardTitle>
                    <CardDescription>
                        Toplam {filteredOrders.length} işlem bulundu
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                            <Input
                                placeholder="Müşteri adı, e-posta veya sipariş no ile ara..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="pl-9 h-11 bg-white border-gray-200 focus:ring-1 focus:ring-gray-200 transition-all shadow-sm rounded-xl"
                            />
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="flex items-center gap-2 bg-white p-1 px-3 rounded-xl border border-gray-200 focus-within:ring-1 focus-within:ring-gray-200 transition-all shadow-sm">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                                    <SelectTrigger className="w-[140px] h-9 border-none bg-transparent shadow-none focus:ring-0">
                                        <SelectValue placeholder="Durum Seç" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tüm Durumlar</SelectItem>
                                        <SelectItem value="completed">Tamamlandı</SelectItem>
                                        <SelectItem value="pending">Beklemede</SelectItem>
                                        <SelectItem value="cancelled">İptal Edildi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(searchTerm || statusFilter !== "all") && (
                                <Button
                                    variant="ghost"
                                    onClick={clearFilters}
                                    className="h-11 px-4 text-muted-foreground hover:text-red-500 hover:bg-red-50/50 transition-all rounded-xl"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Temizle
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold text-foreground/80"><Hash className="inline h-4 w-4 mr-1 text-muted-foreground" /> Sipariş No</TableHead>
                                    <TableHead className="font-semibold text-foreground/80"><User className="inline h-4 w-4 mr-1 text-muted-foreground" /> Müşteri</TableHead>
                                    <TableHead className="font-semibold text-foreground/80"><CreditCard className="inline h-4 w-4 mr-1 text-muted-foreground" /> Tutar</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Durum</TableHead>
                                    <TableHead className="font-semibold text-foreground/80"><Calendar className="inline h-4 w-4 mr-1 text-muted-foreground" /> Tarih</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Kurslar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10">
                                            Yükleniyor...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10">
                                            Ödeme kaydı bulunamadı
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedOrders.map((order: any) => (
                                        <TableRow key={order._id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">
                                            <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-black">{order.user.name} {order.user.surname}</span>
                                                    <span className="text-xs text-muted-foreground">{order.user.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold text-black">
                                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(order.totalAmount)}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                                            <TableCell className="text-sm">
                                                {new Date(order.createdAt).toLocaleDateString('tr-TR')} {new Date(order.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    {order.courses.map((c: any, i: number) => (
                                                        <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                                                            {c.course?.title || "Bilinmeyen Kurs"}
                                                        </span>
                                                    ))}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <SimplePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
