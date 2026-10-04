-- ============================================================
--  Demo Seed Data — Sri Ganesh General Stores
--  Run AFTER schema.sql
-- ============================================================

USE general_store_db;

-- --------------------------------
-- USERS (password = "admin123" hashed with bcrypt)
-- --------------------------------
INSERT INTO users (name, email, password, role, passkey, post_desc) VALUES
  ('Ganesh Reddy',  'admin@sriganesh.com', '$2b$10$KLjwRq3LE.YzCB9slyWNPOEhRb7EVJt4fSnHFiHMJJ4hVFMPKs1Xm', 'admin',   '1234', 'Store Owner & Administrator'),
  ('Priya Sharma',  'priya@sriganesh.com', '$2b$10$KLjwRq3LE.YzCB9slyWNPOEhRb7EVJt4fSnHFiHMJJ4hVFMPKs1Xm', 'cashier', '5678', 'Senior Cashier'),
  ('Ravi Kumar',    'ravi@sriganesh.com',  '$2b$10$KLjwRq3LE.YzCB9slyWNPOEhRb7EVJt4fSnHFiHMJJ4hVFMPKs1Xm', 'staff',   NULL,   'Stock Keeper'),
  ('Anita Verma',   'anita@sriganesh.com', '$2b$10$KLjwRq3LE.YzCB9slyWNPOEhRb7EVJt4fSnHFiHMJJ4hVFMPKs1Xm', 'cashier', '9012', 'Counter Cashier');

-- --------------------------------
-- CATEGORIES
-- --------------------------------
INSERT INTO categories (name, icon) VALUES
  ('Beverages','local_drink'),
  ('Dairy & Eggs','egg'),
  ('Snacks','cookie'),
  ('Staples & Grains','grain'),
  ('Personal Care','face'),
  ('Household & Cleaning','cleaning_services'),
  ('Frozen & Chilled','ac_unit'),
  ('Bakery','bakery_dining');

-- --------------------------------
-- SUPPLIERS
-- --------------------------------
INSERT INTO suppliers (name, contact, phone, email, address) VALUES
  ('HUL Distributors Pvt Ltd','Mahesh Iyer','9820011223','orders@hul-dist.in','Plot 12, MIDC, Pune - 411019'),
  ('ITC Trade Network','Arvind Kapoor','9811122334','supply@itc-trade.com','45 Nehru Road, Mumbai - 400001'),
  ('Parle Products Agency','Suresh Joshi','9977766554','agency@parle-dist.in','Sector 18, Noida - 201301'),
  ('Amul Gujarat Milk Mktg','Deepa Nair','9844455667','orders@amul-dist.com','Near Bus Stand, Anand - 388001'),
  ('Nestle India Distributors','Kavita Sharma','9833344556','nsales@nestle-agency.in','Industrial Area, Delhi - 110020'),
  ('Fortune Agro Distributors','Rajendra Gupta','7890011223','orders@fortune-agro.in','Ring Road, Surat - 395002');

-- --------------------------------
-- PRODUCTS
-- --------------------------------
INSERT INTO products (name, sku, category_id, supplier_id, qty, reorder_lvl, cost_price, sell_price, unit, location, image_url) VALUES
  ('Pepsi 500ml PET Bottle','BEV-001',1,2,120,30,20.00,30.00,'bottle','Shelf A1','https://images.unsplash.com/photo-1629203432180-71e9b18d855a?w=300&auto=format&fit=crop&q=80'),
  ('Coca-Cola 1L PET Bottle','BEV-002',1,2,90,25,40.00,55.00,'bottle','Shelf A1','https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&auto=format&fit=crop&q=80'),
  ('Bisleri Water 1L','BEV-003',1,2,200,50,12.00,20.00,'bottle','Shelf A2','https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&auto=format&fit=crop&q=80'),
  ('Frooti Mango Drink 200ml','BEV-004',1,1,150,40,10.00,15.00,'pack','Shelf A2','https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300&auto=format&fit=crop&q=80'),
  ('Red Bull Energy Drink 250ml','BEV-005',1,5,40,15,95.00,125.00,'can','Shelf A3','https://images.unsplash.com/photo-1527156231393-7023794f363c?w=300&auto=format&fit=crop&q=80'),
  ('Mother Dairy Milk 1L Toned','DAI-001',2,4,60,20,50.00,60.00,'pack','Fridge B1','https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&auto=format&fit=crop&q=80'),
  ('Amul Butter 500g','DAI-002',2,4,35,12,225.00,265.00,'pack','Fridge B1','https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=80'),
  ('Amul Paneer 200g','DAI-003',2,4,20,10,70.00,90.00,'pack','Fridge B1','https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&auto=format&fit=crop&q=80'),
  ('Farm Fresh Eggs (Tray of 30)','DAI-004',2,4,25,8,120.00,155.00,'tray','Shelf B2','https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&auto=format&fit=crop&q=80'),
  ('Lays Classic Salted 50g','SNK-001',3,1,180,40,12.00,20.00,'pack','Shelf C1','https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80'),
  ('Kurkure Masala Munch 40g','SNK-002',3,3,160,40,10.00,15.00,'pack','Shelf C1','https://images.unsplash.com/photo-1528825871115-3581a5387919?w=300&auto=format&fit=crop&q=80'),
  ('Parle-G Biscuits 200g','SNK-003',3,3,220,50,8.00,12.00,'pack','Shelf C2','https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&auto=format&fit=crop&q=80'),
  ('Britannia 5050 Biscuits 150g','SNK-004',3,2,130,35,12.00,20.00,'pack','Shelf C2','https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&auto=format&fit=crop&q=80'),
  ('Maggi Noodles 70g','SNK-005',3,5,250,60,10.00,14.00,'pack','Shelf C3','https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&auto=format&fit=crop&q=80'),
  ('Kit Kat 4 Finger 37g','SNK-006',3,5,7,20,22.00,35.00,'bar','Counter','https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&auto=format&fit=crop&q=80'),
  ('Fortune Refined Soybean Oil 1L','STR-001',4,6,80,20,115.00,140.00,'bottle','Shelf D1','https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80'),
  ('Aashirvaad Whole Wheat Atta 5kg','STR-002',4,2,45,15,210.00,260.00,'bag','Shelf D2','https://images.unsplash.com/photo-1556648202-80e751c133da?w=300&auto=format&fit=crop&q=80'),
  ('India Gate Basmati Rice 1kg','STR-003',4,6,55,15,95.00,120.00,'pack','Shelf D2','https://images.unsplash.com/photo-1536304993881-ff86d42a1f38?w=300&auto=format&fit=crop&q=80'),
  ('Tata Salt 1kg Iodised','STR-004',4,2,120,30,18.00,24.00,'pack','Shelf D3','https://images.unsplash.com/photo-1549497538-303791108f95?w=300&auto=format&fit=crop&q=80'),
  ('Tata Dal Arhar 500g','STR-005',4,2,8,20,60.00,80.00,'pack','Shelf D3','https://images.unsplash.com/photo-1585953216773-a8a9cf1b5cff?w=300&auto=format&fit=crop&q=80'),
  ('Colgate Strong Teeth 150g','PRC-001',5,1,90,25,60.00,80.00,'tube','Shelf E1','https://images.unsplash.com/photo-1559082658-cb5a8bc8caf6?w=300&auto=format&fit=crop&q=80'),
  ('Dove Body Bar Soap 100g','PRC-002',5,1,110,30,52.00,70.00,'bar','Shelf E1','https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=300&auto=format&fit=crop&q=80'),
  ('Sunsilk Shampoo 80ml Sachet','PRC-003',5,1,200,50,4.00,8.00,'sachet','Shelf E2','https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=300&auto=format&fit=crop&q=80'),
  ('Ponds Cold Cream 100ml','PRC-004',5,1,40,15,90.00,120.00,'jar','Shelf E2','https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&auto=format&fit=crop&q=80'),
  ('Vim Dishwash Gel 500ml','HHD-001',6,1,60,18,70.00,90.00,'bottle','Shelf F1','https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&auto=format&fit=crop&q=80'),
  ('Surf Excel Detergent 1kg','HHD-002',6,1,50,15,160.00,200.00,'pack','Shelf F1','https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&auto=format&fit=crop&q=80'),
  ('Dettol Floor Cleaner 1L','HHD-003',6,1,5,15,155.00,200.00,'bottle','Shelf F2','https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&auto=format&fit=crop&q=80'),
  ('Good Knight Mosquito Coil 10s','HHD-004',6,3,80,20,28.00,40.00,'box','Shelf F2','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&auto=format&fit=crop&q=80'),
  ('Modern Brown Bread 200g','BAK-001',8,3,30,10,32.00,45.00,'loaf','Bread Corner','https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80'),
  ('Britannia Cake 100g','BAK-002',8,2,60,20,18.00,25.00,'pack','Bread Corner','https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80');

-- --------------------------------
-- PURCHASES
-- --------------------------------
INSERT INTO purchases (po_no, supplier_id, total_cost, purchase_date, created_by) VALUES
  ('PO-2026-001',1,4800.00,'2026-09-20',1),
  ('PO-2026-002',4,6200.00,'2026-09-22',1),
  ('PO-2026-003',3,3500.00,'2026-09-25',1),
  ('PO-2026-004',2,7100.00,'2026-09-28',1),
  ('PO-2026-005',6,5500.00,'2026-10-01',1);

INSERT INTO purchase_items (purchase_id, product_id, qty, unit_cost) VALUES
  (1,1,200,20.00),(1,4,200,10.00),(2,6,80,50.00),(2,7,40,225.00),
  (3,10,300,12.00),(3,11,300,10.00),(4,12,400,8.00),(4,15,200,10.00),
  (5,17,100,115.00),(5,18,50,210.00);

-- --------------------------------
-- SALES
-- --------------------------------
INSERT INTO sales (bill_no, customer_name, cashier_id, total_amount, discount, payment_mode, sale_date) VALUES
  ('BILL-0001','Ramesh Patel',2,285.00,0.00,'cash','2026-09-28'),
  ('BILL-0002','Sunita Rao',2,142.00,0.00,'upi','2026-09-28'),
  ('BILL-0003','Walk-in Customer',4,55.00,0.00,'cash','2026-09-29'),
  ('BILL-0004','Dinesh Agarwal',2,520.00,20.00,'card','2026-09-29'),
  ('BILL-0005','Walk-in Customer',4,99.00,0.00,'cash','2026-09-30'),
  ('BILL-0006','Pooja Singh',2,315.00,0.00,'upi','2026-09-30'),
  ('BILL-0007','Walk-in Customer',4,75.00,0.00,'cash','2026-10-01'),
  ('BILL-0008','Kiran Mehta',2,680.00,30.00,'card','2026-10-01'),
  ('BILL-0009','Walk-in Customer',4,48.00,0.00,'cash','2026-10-02'),
  ('BILL-0010','Anand Krishnamurthy',2,390.00,0.00,'upi','2026-10-02');

INSERT INTO sale_items (sale_id, product_id, qty, unit_price) VALUES
  (1,1,3,30.00),(1,7,1,265.00),(1,12,1,12.00),(1,13,1,20.00),
  (2,6,2,60.00),(2,15,2,14.00),
  (3,4,2,15.00),(3,12,1,12.00),(3,10,1,20.00),(3,16,1,35.00),
  (4,17,2,140.00),(4,18,1,260.00),
  (5,21,2,70.00),(5,22,1,80.00),
  (6,18,2,120.00),(6,20,1,80.00),(6,19,1,24.00),
  (7,13,2,20.00),(7,11,2,15.00),
  (8,6,4,60.00),(8,7,2,265.00),(8,9,1,155.00),
  (9,3,2,20.00),(9,12,1,12.00),
  (10,25,2,90.00),(10,26,1,200.00),(10,27,1,200.00);
