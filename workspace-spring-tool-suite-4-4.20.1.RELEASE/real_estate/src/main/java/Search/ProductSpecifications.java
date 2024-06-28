package Search;
import org.springframework.data.jpa.domain.Specification;

import com.example.estate.entity.Product;

public class ProductSpecifications {

    public static Specification<Product> hasProductCode(Long productCode) {
        return (product, cq, cb) -> cb.equal(product.get("productCode"), productCode);
    }

    public static Specification<Product> hasProductName(String productName) {
        return (product, cq, cb) -> cb.like(cb.lower(product.get("productName")), "%" + productName.toLowerCase() + "%");
    }

    public static Specification<Product> hasCompanyName(String companyName) {
        return (product, cq, cb) -> cb.like(cb.lower(product.get("companyName")), "%" + companyName.toLowerCase() + "%");
    }

    public static Specification<Product> hasProductStock(Integer productStock) {
        return (product, cq, cb) -> cb.equal(product.get("productStock"), productStock);
    }

    public static Specification<Product> hasProductPrice(Integer productPrice) {
        return (product, cq, cb) -> cb.equal(product.get("productPrice"), productPrice);
    }

    public static Specification<Product> hasCategory(String category) {
        return (product, cq, cb) -> cb.like(cb.lower(product.get("category")), "%" + category.toLowerCase() + "%");
    }
}
