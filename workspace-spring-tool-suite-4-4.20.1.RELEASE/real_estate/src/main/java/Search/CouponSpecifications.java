package Search;

import org.springframework.data.jpa.domain.Specification;

import com.example.estate.entity.Coupon;

import java.time.LocalDate;

public class CouponSpecifications {

    public static Specification<Coupon> hasCouponCode(Long couponCode) {
        return (coupon, cq, cb) -> cb.equal(coupon.get("couponCode"), couponCode);
    }

    public static Specification<Coupon> hasSerialCode(String serialCode) {
        return (coupon, cq, cb) -> cb.like(cb.lower(coupon.get("serialCode")), "%" + serialCode.toLowerCase() + "%");
    }

    public static Specification<Coupon> hasDiscountAmount(Integer discountAmount) {
        return (coupon, cq, cb) -> cb.equal(coupon.get("discountAmount"), discountAmount);
    }

    public static Specification<Coupon> hasIssueDate(LocalDate issueDate) {
        return (coupon, cq, cb) -> cb.equal(coupon.get("issueDate"), issueDate);
    }

    public static Specification<Coupon> hasExpiryDate(LocalDate expiryDate) {
        return (coupon, cq, cb) -> cb.equal(coupon.get("expiryDate"), expiryDate);
    }

    public static Specification<Coupon> hasMinPurchaseAmount(Integer minPurchaseAmount) {
        return (coupon, cq, cb) -> cb.equal(coupon.get("minPurchaseAmount"), minPurchaseAmount);
    }

    public static Specification<Coupon> isUsed(Boolean used) {
        return (coupon, cq, cb) -> cb.equal(coupon.get("used"), used);
    }
}
