"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateMenuOrder,
} from "@/redux/actions/menuActions"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Pencil, Trash2, GripVertical, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SubMenu {
    title: string
    link: string
}

interface MenuItem {
    _id: string
    title: string
    link: string
    hasDropdown: boolean
    megaMenu: boolean
    subMenus: SubMenu[]
    order: number
    isActive: boolean
    createdAt: string
}

function SortableRow({
    item,
    onEdit,
    onDelete
}: {
    item: MenuItem
    onEdit: (item: MenuItem) => void
    onDelete: (item: MenuItem) => void
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item._id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell>
                <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
            </TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
                <code className="text-sm bg-muted px-2 py-1 rounded">{item.link}</code>
            </TableCell>
            <TableCell>
                {item.hasDropdown ? (
                    <Badge variant="secondary">Dropdown</Badge>
                ) : (
                    <Badge variant="outline">Link</Badge>
                )}
            </TableCell>
            <TableCell>
                <Badge variant="secondary">{item.subMenus?.length || 0}</Badge>
            </TableCell>
            <TableCell>
                <Badge variant="secondary">{item.order}</Badge>
            </TableCell>
            <TableCell>
                {item.isActive ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Aktif
                    </Badge>
                ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Pasif
                    </Badge>
                )}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(item)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default function MenuPage() {
    const dispatch = useAppDispatch()
    const { menuItems, loading } = useAppSelector((state) => state.menuManagement)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        hasDropdown: false,
        megaMenu: false,
        subMenus: [] as SubMenu[],
    })

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        dispatch(getAllMenuItems())
    }, [dispatch])

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = menuItems.findIndex((item) => item._id === active.id)
            const newIndex = menuItems.findIndex((item) => item._id === over.id)

            const newItems = arrayMove(menuItems, oldIndex, newIndex)

            try {
                const orderUpdates = newItems.map((item, index) => ({
                    _id: item._id,
                    order: index,
                }))
                await dispatch(updateMenuOrder(orderUpdates)).unwrap()
                toast.success("Sıralama güncellendi")
            } catch (error: any) {
                toast.error(error || "Sıralama güncellenirken hata oluştu")
                dispatch(getAllMenuItems())
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.link) {
            toast.error("Lütfen tüm zorunlu alanları doldurun")
            return
        }

        try {
            if (selectedItem) {
                await dispatch(updateMenuItem({ id: selectedItem._id, menuData: formData })).unwrap()
                toast.success("Menü öğesi güncellendi")
            } else {
                await dispatch(createMenuItem({ ...formData, order: menuItems.length })).unwrap()
                toast.success("Menü öğesi oluşturuldu")
            }

            setDialogOpen(false)
            resetForm()
        } catch (error: any) {
            toast.error(error || "İşlem başarısız")
        }
    }

    const handleDelete = async () => {
        if (!selectedItem) return

        try {
            await dispatch(deleteMenuItem(selectedItem._id)).unwrap()
            toast.success("Menü öğesi silindi")
            setDeleteDialogOpen(false)
            setSelectedItem(null)
        } catch (error: any) {
            toast.error(error || "Silme işlemi başarısız")
        }
    }

    const openEditDialog = (item: MenuItem) => {
        setSelectedItem(item)
        setFormData({
            title: item.title,
            link: item.link,
            hasDropdown: item.hasDropdown,
            megaMenu: item.megaMenu,
            subMenus: item.subMenus || [],
        })
        setDialogOpen(true)
    }

    const openCreateDialog = () => {
        setSelectedItem(null)
        resetForm()
        setDialogOpen(true)
    }

    const resetForm = () => {
        setFormData({
            title: "",
            link: "",
            hasDropdown: false,
            megaMenu: false,
            subMenus: [],
        })
        setSelectedItem(null)
    }

    const addSubMenu = () => {
        setFormData({
            ...formData,
            subMenus: [...formData.subMenus, { title: "", link: "" }],
        })
    }

    const removeSubMenu = (index: number) => {
        setFormData({
            ...formData,
            subMenus: formData.subMenus.filter((_, i) => i !== index),
        })
    }

    const updateSubMenu = (index: number, field: "title" | "link", value: string) => {
        const newSubMenus = [...formData.subMenus]
        newSubMenus[index][field] = value
        setFormData({ ...formData, subMenus: newSubMenus })
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Menü Yönetimi</h2>
                    <p className="text-muted-foreground">
                        Menü öğelerini sürükle-bırak ile sıralayın ve yönetin
                    </p>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Menü Öğesi
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Menü Öğeleri</CardTitle>
                    <CardDescription>Toplam {menuItems.length} menü öğesi</CardDescription>
                </CardHeader>
                <CardContent>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]"></TableHead>
                                        <TableHead>Başlık</TableHead>
                                        <TableHead>Link</TableHead>
                                        <TableHead>Tip</TableHead>
                                        <TableHead>Alt Menü</TableHead>
                                        <TableHead>Sıra</TableHead>
                                        <TableHead>Durum</TableHead>
                                        <TableHead className="text-right">İşlemler</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center">
                                                Yükleniyor...
                                            </TableCell>
                                        </TableRow>
                                    ) : menuItems.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center">
                                                Menü öğesi bulunamadı
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <SortableContext
                                            items={menuItems.map((item) => item._id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {menuItems.map((item) => (
                                                <SortableRow
                                                    key={item._id}
                                                    item={item}
                                                    onEdit={openEditDialog}
                                                    onDelete={(item) => {
                                                        setSelectedItem(item)
                                                        setDeleteDialogOpen(true)
                                                    }}
                                                />
                                            ))}
                                        </SortableContext>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </DndContext>
                </CardContent>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedItem ? "Menü Öğesi Düzenle" : "Yeni Menü Öğesi Oluştur"}
                        </DialogTitle>
                        <DialogDescription>Menü öğesi bilgilerini girin.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Başlık *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Örn: Ana Sayfa"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="link">Link *</Label>
                                <Input
                                    id="link"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    placeholder="Örn: /"
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="hasDropdown"
                                    checked={formData.hasDropdown}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, hasDropdown: checked as boolean })
                                    }
                                />
                                <Label htmlFor="hasDropdown" className="cursor-pointer">
                                    Dropdown Menü
                                </Label>
                            </div>

                            {/* Alt Menüler */}
                            {formData.hasDropdown && (
                                <div className="space-y-3 border-t pt-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Alt Menüler</Label>
                                        <Button type="button" size="sm" onClick={addSubMenu}>
                                            <Plus className="h-4 w-4 mr-1" />
                                            Alt Menü Ekle
                                        </Button>
                                    </div>
                                    {formData.subMenus.map((subMenu, index) => (
                                        <div key={index} className="grid grid-cols-[1fr,1fr,auto] gap-2 items-end">
                                            <div className="grid gap-1">
                                                <Label className="text-xs">Başlık</Label>
                                                <Input
                                                    value={subMenu.title}
                                                    onChange={(e) => updateSubMenu(index, "title", e.target.value)}
                                                    placeholder="Alt menü başlığı"
                                                    size={1}
                                                />
                                            </div>
                                            <div className="grid gap-1">
                                                <Label className="text-xs">Link</Label>
                                                <Input
                                                    value={subMenu.link}
                                                    onChange={(e) => updateSubMenu(index, "link", e.target.value)}
                                                    placeholder="/link"
                                                    size={1}
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeSubMenu(index)}
                                            >
                                                <X className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                İptal
                            </Button>
                            <Button type="submit">{selectedItem ? "Güncelle" : "Oluştur"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu menü öğesi kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Sil
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
