import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS, formatPrice } from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Category, Product } from "@/types";
import { Edit2, PackagePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AdminProduct extends Product {
  isActive: boolean;
}

const initialProducts: AdminProduct[] = SAMPLE_PRODUCTS.map((p) => ({
  ...p,
  isActive: true,
}));

const EMPTY_FORM: Omit<AdminProduct, "id" | "rating" | "reviewCount"> = {
  name: "",
  description: "",
  price: 0,
  category: "clothing",
  imageUrl: "",
  stock: 0,
  isActive: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [imagePreview, setImagePreview] = useState<string>("");

  const nonAllCategories = SAMPLE_CATEGORIES.filter((c) => c.id !== "all");

  function openAdd() {
    setEditTarget(null);
    setForm({ ...EMPTY_FORM });
    setImagePreview("");
    setDialogOpen(true);
  }

  function openEdit(p: AdminProduct) {
    setEditTarget(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl,
      stock: p.stock,
      isActive: p.isActive,
    });
    setImagePreview(p.imageUrl);
    setDialogOpen(true);
  }

  function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setForm((f) => ({ ...f, imageUrl: url }));
  }

  function handleSave() {
    if (!form.name.trim() || !form.price) {
      toast.error("Name and price are required.");
      return;
    }
    if (editTarget) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editTarget.id ? { ...editTarget, ...form } : p,
        ),
      );
      toast.success("Product updated.");
    } else {
      const newProduct: AdminProduct = {
        ...form,
        id: String(Date.now()),
        rating: 0,
        reviewCount: 0,
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success("Product added.");
    }
    setDialogOpen(false);
  }

  function handleDelete(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteTarget(null);
    toast.success("Product deleted.");
  }

  return (
    <div
      className="min-h-screen bg-muted/30 py-8"
      data-ocid="admin_products.page"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {products.length} items in catalog
            </p>
          </div>
          <Button onClick={openAdd} data-ocid="admin_products.add_button">
            <PackagePlus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Card className="border-border bg-card shadow-subtle">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right font-semibold text-muted-foreground">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right font-semibold text-muted-foreground">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr
                      key={product.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid={`admin_products.item.${idx + 1}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg object-cover bg-muted"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "/assets/images/placeholder.svg";
                            }}
                          />
                          <span className="font-medium text-foreground line-clamp-1 max-w-[200px]">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-muted-foreground">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-foreground">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4 text-right text-muted-foreground">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant={product.isActive ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(product)}
                            data-ocid={`admin_products.edit_button.${idx + 1}`}
                            className="h-8 w-8"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(product.id)}
                            data-ocid={`admin_products.delete_button.${idx + 1}`}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_products.dialog">
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="p-name">Name</Label>
                <Input
                  id="p-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Product name"
                  data-ocid="admin_products.name_input"
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="p-desc">Description</Label>
                <Textarea
                  id="p-desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Product description"
                  rows={3}
                  data-ocid="admin_products.description_textarea"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-price">Price (cents)</Label>
                <Input
                  id="p-price"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: Number(e.target.value) }))
                  }
                  placeholder="2999"
                  data-ocid="admin_products.price_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-stock">Stock</Label>
                <Input
                  id="p-stock"
                  type="number"
                  min={0}
                  value={form.stock}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stock: Number(e.target.value) }))
                  }
                  placeholder="0"
                  data-ocid="admin_products.stock_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger data-ocid="admin_products.category_select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {nonAllCategories.map((c: Category) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <Switch
                  id="p-active"
                  checked={form.isActive}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isActive: v }))
                  }
                  data-ocid="admin_products.active_switch"
                />
                <Label htmlFor="p-active" className="cursor-pointer">
                  Active
                </Label>
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="p-image">Product Image</Label>
                <Input
                  id="p-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="cursor-pointer"
                  data-ocid="admin_products.upload_button"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-24 w-24 rounded-lg object-cover border border-border"
                  />
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin_products.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              data-ocid="admin_products.save_button"
            >
              {editTarget ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin_products.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently
              removed from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin_products.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              data-ocid="admin_products.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
