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
import { Search, CreditCard, Calendar, User, Hash } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OdemelerPage() {
    const dispatch = useAppDispatch()
    const { allOrders, loading } = useAppSelector((state) => state.paymentManagement)

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])

    const filteredOrders = allOrders?.filter((order: any) =>
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

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

            <Card>
                <CardHeader>
                    <CardTitle>Ödemeler</CardTitle>
                    <CardDescription>
                        Toplam {filteredOrders.length} işlem bulundu
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Müşteri adı, e-posta veya sipariş no ile ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead><Hash className="inline h-4 w-4 mr-1" /> Sipariş No</TableHead>
                                    <TableHead><User className="inline h-4 w-4 mr-1" /> Müşteri</TableHead>
                                    <TableHead><CreditCard className="inline h-4 w-4 mr-1" /> Tutar</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead><Calendar className="inline h-4 w-4 mr-1" /> Tarih</TableHead>
                                    <TableHead>Kurslar</TableHead>
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
                                    filteredOrders.map((order: any) => (
                                        <TableRow key={order._id}>
                                            <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-black">{order.user.name} {order.user.surname}</span>
                                                    <span className="text-xs text-muted-foreground">{order.user.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold text-black">
                                                ₺{order.totalAmount.toFixed(2)}
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
                </CardContent>
            </Card>
        </div>
    )
}
