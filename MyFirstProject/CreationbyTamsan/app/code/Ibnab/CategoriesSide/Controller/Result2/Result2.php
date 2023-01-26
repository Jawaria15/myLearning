<?php

namespace Ibnab\CategoriesSide\Controller\Result2;

use Magento\Framework\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\Controller\Result\JsonFactory;



class Result2 extends \Magento\Framework\App\Action\Action
{

     /**
     * @var Magento\Framework\View\Result\PageFactory
     */
    protected $resultPageFactory;

    protected $resultJsonFactory; 

    protected $_categoryFactory;
    protected $categoryRepository;
    protected $productCollectionFactory;
    protected $storemanager;
    protected $_scopeConfig;



    /**
     * @param Context     $context
     * @param PageFactory $resultPageFactory
     */
    public function __construct(
        Context $context,
        PageFactory $resultPageFactory,
        JsonFactory $resultJsonFactory,
        \Magento\Catalog\Model\CategoryFactory $categoryFactory,
        \Magento\Catalog\Api\CategoryRepositoryInterface $categoryRepository,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
        \Magento\Store\Model\StoreManagerInterface $storemanager,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Framework\View\Asset\Repository $assetRepos,
        \Magento\Catalog\Helper\ImageFactory $helperImageFactory,




        )
    {
        $this->_categoryFactory = $categoryFactory;
        $this->resultPageFactory = $resultPageFactory;
        $this->resultJsonFactory = $resultJsonFactory; 
        $this->categoryRepository = $categoryRepository; 
        $this->_productCollectionFactory = $productCollectionFactory;
        $this->_storeManager =  $storemanager;
        $this->_scopeConfig = $scopeConfig;
        $this->assetRepos = $assetRepos;
        $this->helperImageFactory = $helperImageFactory;

        




        return parent::__construct($context);
    }
  
    

    public function execute()
    {
        $result = $this->resultJsonFactory->create();
        $categoryId = $this->getRequest()->getParam('category_id');
        $category = $this->_categoryFactory->create()->load($categoryId);
        $collection = $this->_productCollectionFactory->create();
        $collection->addAttributeToSelect('*');
        $collection->addCategoriesFilter(['in' =>  $categoryId]);
        $categoryProducts =  $collection;
        $store = $this->_storeManager->getStore();
         $imagePlaceholder = $this->helperImageFactory->create();
         



        $record = array();
      


        foreach ($categoryProducts as $product) {
            $productUrl = $product->getProductUrl();

            // $myattribute0 = $product->getResource()->getAttribute('approximate_polished_dwt')->getFrontend()->getValue($product);
            // $myattribute1 = $product->getResource()->getAttribute('semi_mount_cttw')->getFrontend()->getValue($product);
            // $myattribute2 = $product->getResource()->getAttribute('center_size')->getFrontend()->getValue($product);
            // $myattribute3 = $product->getResource()->getAttribute('center_shape')->getFrontend()->getValue($product);

         
     
          if($product->getImage())
               {
                $productImageUrl = $store->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA) . 'catalog/product' .$product->getImage();

                 }
                 else{
                    $productImageUrl=$this->assetRepos->getUrl($imagePlaceholder->getPlaceholder('image')); 
                 }
            $record[] = [
               
                // $product->getName(),
                $productImageUrl,
                $product->getSku()
                // $product->getShortDescription(),
                // $product->getPrice(),
                // $myattribute0,
                // $myattribute1,
                // $myattribute2,
                // $myattribute3
                

               
            ];
           
        }
        

        return $result->setData($record);
    } 
}