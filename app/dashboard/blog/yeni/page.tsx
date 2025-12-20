"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { createBlog, updateBlog, getBlogById } from "@/redux/actions/blogActions"
import { getAllBlogCategories } from "@/redux/actions/blogCategoryActions"
import { uploadImageToCloudinary } from "@/utils/cloudinary"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Upload, X, Image as ImageIcon, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import RichTextEditor from "@/components/RichTextEditor"
import BlogCategoryManager from "@/components/dashboard/BlogCategoryManager"

function BlogFormContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { categories } = useAppSelector((state) => state.blogCategoryManagement)
    const blogId = searchParams.get("id")
    const isEdit = !!blogId

    const [uploadingImage, setUploadingImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingBlog, setLoadingBlog] = useState(false)
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        thumb: "",
        tag: "Genel",
        tags: [] as string[],
        readTime: "5 Dakika Okuma",
        status: "draft" as "draft" | "published" | "archived"
    })

    const [tagInput, setTagInput] = useState("")

    // Load categories on mount
    useEffect(() => {
        dispatch(getAllBlogCategories({ isActive: true }))
    }, [dispatch])

    useEffect(() => {
        const loadBlog = async () => {
            if (!blogId) return

            setLoadingBlog(true)
            try {
                const result = await dispatch(getBlogById(blogId)).unwrap()
                setFormData({
                    title: result.title,
                    slug: result.slug,
                    excerpt: result.excerpt,
                    content: result.content,
                    thumb: result.thumb || "",
                    tag: result.tag,
                    tags: result.tags || [],
                    readTime: result.readTime,
                    status: result.status
                })
            } catch (error) {
                toast.error("Blog yüklenemedi")
                router.push("/dashboard/blog")
            } finally {
                setLoadingBlog(false)
            }
        }

        loadBlog()
    }, [blogId, dispatch, router])

    // Auto-generate slug from title
    const generateSlug = (title: string) => {
        const turkishMap: { [key: string]: string } = {
            'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
            'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
        }

        return title
            .split('')
            .map(char => turkishMap[char] || char)
            .join('')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: isEdit ? formData.slug : generateSlug(title)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
            toast.error("Lütfen zorunlu alanları doldurun")
            return
        }

        setLoading(true)
        try {
            if (isEdit && blogId) {
                await dispatch(updateBlog({ id: blogId, ...formData })).unwrap()
                toast.success("Blog güncellendi")
            } else {
                await dispatch(createBlog(formData)).unwrap()
                toast.success("Blog oluşturuldu")
            }
            router.push("/dashboard/blog")
        } catch (error: any) {
            toast.error(error || "İşlem başarısız")
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadingImage(true)
        try {
            const imageUrl = await uploadImageToCloudinary(file)
            setFormData({ ...formData, thumb: imageUrl })
            toast.success("Görsel yüklendi")
        } catch (error) {
            toast.error("Görsel yüklenemedi")
        } finally {
            setUploadingImage(false)
        }
    }

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            })
            setTagInput("")
        }
    }

    const removeTag = (index: number) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((_, i) => i !== index)
        })
    }

    if (loadingBlog) {
        return (
            <div className="flex-1 p-8 pt-6">
                <div className="flex items-center justify-center h-96">
                    <p>Yükleniyor...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 p-8 pt-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Geri
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? "Blog Düzenle" : "Yeni Blog Ekle"}
                        </h1>
                        <p className="text-muted-foreground">
                            Blog bilgilerini eksiksiz doldurun
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sol Taraf - Ana İçerik */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Temel Bilgiler */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Temel Bilgiler</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Blog Başlığı *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="Örn: Veri Bilimi ile Geleceği Keşfedin"
                                        required
                                        className="text-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">URL Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="veri-bilimi-ile-gelecegi-kesfedin"
                                        required
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        /blog/{formData.slug || "blog-adi"}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Kısa Açıklama *</Label>
                                    <Input
                                        id="excerpt"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        placeholder="Blog yazısının kısa özeti..."
                                        required
                                        maxLength={300}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {formData.excerpt.length}/300 karakter
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* İçerik */}
                        <Card>
                            <CardHeader>
                                <CardTitle>İçerik *</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RichTextEditor
                                    content={formData.content}
                                    onChange={(html) => setFormData({ ...formData, content: html })}
                                    placeholder="Blog içeriğinizi buraya yazın..."
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sağ Taraf - Sidebar */}
                    <div className="space-y-6">
                        {/* Yayınla */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Yayınla</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {isEdit ? (
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Durum</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Taslak</SelectItem>
                                                <SelectItem value="published">Yayında</SelectItem>
                                                <SelectItem value="archived">Arşivlendi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="status">Durum</Label>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="status"
                                                checked={formData.status === "published"}
                                                onCheckedChange={(checked) =>
                                                    setFormData({ ...formData, status: checked ? "published" : "draft" })
                                                }
                                            />
                                            <Badge variant={formData.status === "published" ? "default" : "secondary"}>
                                                {formData.status === "published" ? "Yayında" : "Taslak"}
                                            </Badge>
                                        </div>
                                    </div>
                                )}
                                <Button type="submit" className="w-full" disabled={loading}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {loading ? "Kaydediliyor..." : isEdit ? "Güncelle" : formData.status === "published" ? "Yayınla" : "Taslak Olarak Kaydet"}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Kapak Görseli */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Kapak Görseli</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {formData.thumb ? (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                                        <Image
                                            src={formData.thumb}
                                            alt="Kapak görseli"
                                            fill
                                            className="object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            onClick={() => setFormData({ ...formData, thumb: "" })}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Kapak görseli yükleyin
                                        </p>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="thumb-upload"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById("thumb-upload")?.click()}
                                            disabled={uploadingImage}
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            {uploadingImage ? "Yükleniyor..." : "Görsel Seç"}
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Kategori */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">Kategori</CardTitle>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCategoryModalOpen(true)}
                                    >
                                        <Settings className="h-4 w-4 mr-2" />
                                        Yönet
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Select
                                    value={formData.tag}
                                    onValueChange={(value) => setFormData({ ...formData, tag: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category: any) => (
                                            <SelectItem key={category._id} value={category.name}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        {/* Etiketler */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Etiketler</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex gap-2">
                                    <Input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        placeholder="Etiket ekle..."
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                addTag()
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={addTag} variant="outline">
                                        Ekle
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary" className="gap-1">
                                            {tag}
                                            <X
                                                className="h-3 w-3 cursor-pointer"
                                                onClick={() => removeTag(index)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Okuma Süresi */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Okuma Süresi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    placeholder="5 Dakika Okuma"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>

            {/* Blog Category Manager Modal */}
            <BlogCategoryManager
                open={categoryModalOpen}
                onOpenChange={setCategoryModalOpen}
                onSelect={(categoryName) => {
                    setFormData({ ...formData, tag: categoryName })
                    dispatch(getAllBlogCategories({ isActive: true }))
                }}
            />
        </div>
    )
}

export default function YeniBlogPage() {
    return (
        <Suspense fallback={<div className="flex-1 p-8 pt-6"><p>Yükleniyor...</p></div>}>
            <BlogFormContent />
        </Suspense>
    )
}
