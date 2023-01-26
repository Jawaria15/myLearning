<?php

namespace Ibnab\CategoriesSide\Controller\Result;

use Magento\Framework\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\Controller\Result\JsonFactory;


class Result extends \Magento\Framework\App\Action\Action
{

     /**
     * @var Magento\Framework\View\Result\PageFactory
     */
    protected $resultPageFactory;

    protected $resultJsonFactory; 

    protected $_categoryFactory;
    protected $categoryRepository;

    /**
     * @param Context     $context
     * @param PageFactory $resultPageFactory
     */
    public function __construct(
        Context $context,
        PageFactory $resultPageFactory,
        JsonFactory $resultJsonFactory,
        \Magento\Catalog\Model\CategoryFactory $categoryFactory,
        \Magento\Catalog\Api\CategoryRepositoryInterface $categoryRepository

        )
    {
        $this->_categoryFactory = $categoryFactory;
        $this->resultPageFactory = $resultPageFactory;
        $this->resultJsonFactory = $resultJsonFactory; 
        $this->categoryRepository = $categoryRepository; 
        return parent::__construct($context);
    }
  
    

    public function execute()
    {
        $result = $this->resultJsonFactory->create();
        $categoryId = $this->getRequest()->getParam('category_id');
        $category = $this->_categoryFactory->create()->load($categoryId);
        
        // print_r($category->getChildren());
        $response =[
           
            'category' =>$category->getChildren(),
        ];
        $subcatagories=$category->getChildren();
        $record = array();

        if($subcatagories){
        $childrenArray = explode (",",   $subcatagories);
        foreach( $childrenArray as $Id){
          

            $categoryInstance = $this->categoryRepository->get(" $Id ", $storeId=null);

           $categoryInstance  ->getName();
           $record[] = [
            " $Id ",
            $categoryInstance  ->getName()  ];
        }
    }
   
        // print_R($record);
        // return $result->setData($response);
        return $result->setData($record);
    } 
}