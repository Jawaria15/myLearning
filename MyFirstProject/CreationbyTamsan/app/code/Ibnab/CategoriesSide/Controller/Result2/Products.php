<?php

namespace Ibnab\CategoriesSide\Controller\Result2;

use Magento\Framework\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\Controller\Result\JsonFactory;


class Products extends \Magento\Framework\App\Action\Action
{

     /**
     * @var Magento\Framework\View\Result\PageFactory
     */
    protected $resultPageFactory;

    protected $resultJsonFactory; 
	protected $_productRepository;
    protected $customOptionRepository;



    /**
     * @param Context     $context
     * @param PageFactory $resultPageFactory
     */
    public function __construct(
        Context $context,
        PageFactory $resultPageFactory,
        JsonFactory $resultJsonFactory,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        \Magento\Catalog\Api\ProductCustomOptionRepositoryInterface $customOptionRepository


        )
    {
        $this->_productRepository = $productRepository;
        $this->resultPageFactory = $resultPageFactory;
        $this->resultJsonFactory = $resultJsonFactory; 
        $this->customOptionRepository = $customOptionRepository;

        return parent::__construct($context);
    }
  
    

    public function execute()
    {
        $result = $this->resultJsonFactory->create();
        $sku = $this->getRequest()->getParam('product_id');
        $product = $this->_productRepository->get($sku);
        $cust=$this->customOptionRepository->getList($sku);
        
        $myattribute0 = $product->getResource()->getAttribute('approximate_polished_dwt')->getFrontend()->getValue($product);
        $myattribute1 = $product->getResource()->getAttribute('semi_mount_cttw')->getFrontend()->getValue($product);
        $myattribute2 = $product->getResource()->getAttribute('center_size')->getFrontend()->getValue($product);
        $myattribute3 = $product->getResource()->getAttribute('center_shape')->getFrontend()->getValue($product);
        $names=array();
        $options=array();
        $optionTitle=array();
        if($product->hasOptions()) {
        
            foreach ($product->getOptions() as $o) {
                $names[]=[
                    $o->getTitle()

                ];
                $optionType = $o->getType();
             
                'Type = '.$optionType;
        
                if ($optionType == 'drop_down') {
                  
                    $values = $o->getValues();
                    
                  
                
                  
                    foreach ($values as $k => $v) {
                        $options[]=[
                            $v->getTitle()
                                      ];
                                      $optionTitle[]=[
                                        $o->getTitle()
                                                  ];
                    }
                  
                }
                
                else {
                   $o;
                  
                }
            }
        
        }
       
        $record = array();
        $record[] = [
               
            $product->getName(),
            
           $product->getShortDescription(),
            $product->getPrice(),
             $myattribute0,
             $myattribute1,
             $myattribute2,
            $myattribute3,
            $names,
            $options,
            $optionTitle
            

           
        ];
       
        return $result->setData($record);
    } 
}