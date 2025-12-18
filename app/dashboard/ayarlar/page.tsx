"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getSettings, updateSettings } from "@/redux/actions/settingsActions"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function AyarlarPage() {
    const dispatch = useAppDispatch()
    const { settings, loading } = useAppSelector((state) => state.settingsManagement)

    const [form, setForm] = useState({
        paytr_merchant_id: "",
        paytr_merchant_key: "",
        paytr_merchant_salt: "",
        paytr_test_mode: true,
        paytr_debug_on: true
    })

    useEffect(() => {
        dispatch(getSettings())
    }, [dispatch])

    useEffect(() => {
        if (settings) {
            setForm({
                paytr_merchant_id: settings.paytr_merchant_id || "",
                paytr_merchant_key: settings.paytr_merchant_key || "",
                paytr_merchant_salt: settings.paytr_merchant_salt || "",
                paytr_test_mode: settings.paytr_test_mode !== undefined ? settings.paytr_test_mode : true,
                paytr_debug_on: settings.paytr_debug_on !== undefined ? settings.paytr_debug_on : true
            })
        }
    }, [settings])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await dispatch(updateSettings(form)).unwrap()
            toast.success("Ayarlar başarıyla güncellendi")
        } catch (error: any) {
            toast.error(error || "Ayarlar güncellenirken hata oluştu")
        }
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Ayarlar</h2>

            <div className="max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>PayTR API Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label>Merchant ID</Label>
                                <Input
                                    value={form.paytr_merchant_id}
                                    onChange={(e) => setForm({ ...form, paytr_merchant_id: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label>Merchant Key</Label>
                                <Input
                                    value={form.paytr_merchant_key}
                                    onChange={(e) => setForm({ ...form, paytr_merchant_key: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label>Merchant Salt</Label>
                                <Input
                                    value={form.paytr_merchant_salt}
                                    onChange={(e) => setForm({ ...form, paytr_merchant_salt: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center justify-between border p-3 rounded">
                                <Label>Test Modu</Label>
                                <Switch
                                    checked={form.paytr_test_mode}
                                    onCheckedChange={(checked) => setForm({ ...form, paytr_test_mode: checked })}
                                />
                            </div>

                            <div className="flex items-center justify-between border p-3 rounded">
                                <Label>Debug Modu</Label>
                                <Switch
                                    checked={form.paytr_debug_on}
                                    onCheckedChange={(checked) => setForm({ ...form, paytr_debug_on: checked })}
                                />
                            </div>

                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Kaydediliyor..." : "Ayarları Kaydet"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
