package cat.project.service;

import cat.project.model.Product;
import cat.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Product not found with id: " + id));
    }

    public List<Product> findLatest3() {
        return productRepository.findTop3ByOrderByIdDesc();
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product update(Product product) throws SecurityException {
        Product existing = productRepository.findById(product.getId())
                .orElseThrow(() -> new SecurityException("Product not found with id: " + product.getId()));

        existing.setName(product.getName());
        existing.setImage(product.getImage());
        existing.setSku(product.getSku());
        existing.setPrice(product.getPrice());
        existing.setQuantity(product.getQuantity());

        return productRepository.save(existing);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}