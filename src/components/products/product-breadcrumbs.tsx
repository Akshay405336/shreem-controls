import Link from "next/link";

import { categoryPath, productDetailPath } from "@/lib/product-catalog-utils";
import type { CatalogProduct, MainCategory } from "@/types/product-catalog";

type ProductBreadcrumbsProps = {
  category: MainCategory;
  product?: CatalogProduct;
};

export function ProductBreadcrumbs({ category, product }: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-[11px] text-[#737B7A]">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/products" className="transition-colors hover:text-[#009E98]">
            Products
          </Link>
        </li>
        <li aria-hidden className="text-[#DDECEB]">
          /
        </li>
        <li>
          {product ? (
            <Link
              href={categoryPath(category.slug)}
              className="transition-colors hover:text-[#009E98]"
            >
              {category.name}
            </Link>
          ) : (
            <span className="text-[#252A2A]">{category.name}</span>
          )}
        </li>
        {product && (
          <>
            <li aria-hidden className="text-[#DDECEB]">
              /
            </li>
            <li>
              <Link
                href={`${categoryPath(category.slug)}?brand=${product.brandSlug}`}
                className="transition-colors hover:text-[#009E98]"
              >
                {product.brandName}
              </Link>
            </li>
            <li aria-hidden className="text-[#DDECEB]">
              /
            </li>
            <li className="text-[#252A2A]">{product.name}</li>
          </>
        )}
      </ol>
    </nav>
  );
}

export function productBreadcrumbDetailHref(product: CatalogProduct) {
  return productDetailPath(product);
}
