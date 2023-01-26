<?php
namespace Ibnab\CategoriesSide\Block;
class ChildCatagory extends \Magento\Framework\View\Element\Template
{
    protected $_categoryFactory;
    
    /**
     * @var \Magento\Catalog\Api\CategoryRepositoryInterface
     */
    private $categoryRepository;


    public function __construct(
        \Magento\Backend\Block\Template\Context $context,        
        \Magento\Catalog\Model\CategoryFactory $categoryFactory,
        \Magento\Catalog\Api\CategoryRepositoryInterface $categoryRepository,
        
        array $data = []
    )
    {
        $this->_categoryFactory = $categoryFactory; 
        $this->categoryRepository = $categoryRepository;       
        parent::__construct($context, $data);
    }
    
    /* Get category object */
    public function getCategory($categoryId)
    {
        $category = $this->_categoryFactory->create()->load($categoryId);
        return $category;
    }
    
    /* Get children ids comma separated */
    public function getChildren($categoryId)
    {
        return $this->getCategory($categoryId)->getChildren();
    }
    

    public function getCategoryNameById($id, $storeId = null)
    {
      
        $categoryInstance = $this->categoryRepository->get($id, $storeId);

        return $categoryInstance->getName();
    }
    public function getProductCollectionByCategories($ids)
    {
        $collection = $this->_productCollectionFactory->create();
        $collection->addAttributeToSelect('*');
        $collection->addCategoriesFilter(['in' => ids]);
        return $collection;
    }
    
}
 