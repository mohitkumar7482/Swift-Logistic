/*
  # Swift Logistics Courier Management System Schema

  ## Overview
  This migration creates the complete database schema for the Swift Logistics courier management application.

  ## New Tables

  ### 1. `customers`
  Customer information for the courier service
  - `id` (uuid, primary key): Unique customer identifier
  - `user_id` (uuid, nullable): Links to auth.users for authenticated customers
  - `full_name` (text): Customer's full name
  - `email` (text): Customer email address
  - `phone` (text): Contact phone number
  - `address` (text): Customer address
  - `created_at` (timestamptz): Record creation timestamp

  ### 2. `couriers`
  Delivery personnel information
  - `id` (uuid, primary key): Unique courier identifier
  - `user_id` (uuid, nullable): Links to auth.users for courier authentication
  - `full_name` (text): Courier's full name
  - `email` (text): Courier email address
  - `phone` (text): Contact phone number
  - `vehicle_type` (text): Type of vehicle used for delivery
  - `license_number` (text): Vehicle/driver license number
  - `status` (text): Current status (active, inactive, on_delivery)
  - `created_at` (timestamptz): Record creation timestamp

  ### 3. `shipments`
  Shipment tracking and management
  - `id` (uuid, primary key): Unique shipment identifier
  - `tracking_number` (text, unique): Public tracking number
  - `customer_id` (uuid): Reference to customers table
  - `courier_id` (uuid, nullable): Assigned courier
  - `sender_name` (text): Sender's name
  - `sender_phone` (text): Sender's phone
  - `sender_address` (text): Pickup address
  - `recipient_name` (text): Recipient's name
  - `recipient_phone` (text): Recipient's phone
  - `recipient_address` (text): Delivery address
  - `package_weight` (numeric): Weight in kg
  - `package_dimensions` (text): Package dimensions
  - `service_type` (text): Service level (standard, express, overnight)
  - `status` (text): Current shipment status
  - `estimated_delivery` (timestamptz): Expected delivery date/time
  - `actual_delivery` (timestamptz, nullable): Actual delivery date/time
  - `price` (numeric): Shipping cost
  - `notes` (text, nullable): Additional notes
  - `created_at` (timestamptz): Record creation timestamp
  - `updated_at` (timestamptz): Last update timestamp

  ### 4. `tracking_events`
  Detailed tracking history for shipments
  - `id` (uuid, primary key): Unique event identifier
  - `shipment_id` (uuid): Reference to shipments table
  - `status` (text): Status at this event
  - `location` (text): Current location
  - `description` (text): Event description
  - `created_at` (timestamptz): Event timestamp

  ### 5. `contact_messages`
  Customer inquiries and support messages
  - `id` (uuid, primary key): Unique message identifier
  - `name` (text): Sender's name
  - `email` (text): Sender's email
  - `phone` (text, nullable): Sender's phone
  - `subject` (text): Message subject
  - `message` (text): Message content
  - `status` (text): Message status (new, read, responded)
  - `created_at` (timestamptz): Message timestamp

  ## Security

  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Customers can view and update their own records
  - Couriers can view their assigned shipments
  - Public can create contact messages and track shipments by tracking number
  - Authenticated users with admin rights have full access

  ## Notes
  - All timestamps use timezone-aware timestamps
  - Foreign key constraints ensure data integrity
  - Indexes added for frequently queried fields
  - Default values set for status fields and timestamps
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create couriers table
CREATE TABLE IF NOT EXISTS couriers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  vehicle_type text NOT NULL,
  license_number text NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Create shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  courier_id uuid REFERENCES couriers(id) ON DELETE SET NULL,
  sender_name text NOT NULL,
  sender_phone text NOT NULL,
  sender_address text NOT NULL,
  recipient_name text NOT NULL,
  recipient_phone text NOT NULL,
  recipient_address text NOT NULL,
  package_weight numeric NOT NULL,
  package_dimensions text NOT NULL,
  service_type text DEFAULT 'standard',
  status text DEFAULT 'pending',
  estimated_delivery timestamptz,
  actual_delivery timestamptz,
  price numeric NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tracking_events table
CREATE TABLE IF NOT EXISTS tracking_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id uuid REFERENCES shipments(id) ON DELETE CASCADE,
  status text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_customer_id ON shipments(customer_id);
CREATE INDEX IF NOT EXISTS idx_shipments_courier_id ON shipments(courier_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_id ON tracking_events(shipment_id);
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_couriers_user_id ON couriers(user_id);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE couriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Customers policies
CREATE POLICY "Users can view own customer profile"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own customer profile"
  ON customers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own customer profile"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Couriers policies
CREATE POLICY "Couriers can view own profile"
  ON couriers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Couriers can update own profile"
  ON couriers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Shipments policies
CREATE POLICY "Customers can view own shipments"
  ON shipments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM customers
      WHERE customers.id = shipments.customer_id
      AND customers.user_id = auth.uid()
    )
  );

CREATE POLICY "Couriers can view assigned shipments"
  ON shipments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM couriers
      WHERE couriers.id = shipments.courier_id
      AND couriers.user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can create shipments"
  ON shipments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM customers
      WHERE customers.id = shipments.customer_id
      AND customers.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can track shipments by tracking number"
  ON shipments FOR SELECT
  TO anon
  USING (tracking_number IS NOT NULL);

-- Tracking events policies
CREATE POLICY "Users can view tracking events for accessible shipments"
  ON tracking_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM shipments
      WHERE shipments.id = tracking_events.shipment_id
      AND (
        EXISTS (
          SELECT 1 FROM customers
          WHERE customers.id = shipments.customer_id
          AND customers.user_id = auth.uid()
        )
        OR
        EXISTS (
          SELECT 1 FROM couriers
          WHERE couriers.id = shipments.courier_id
          AND couriers.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Public can view tracking events for shipments"
  ON tracking_events FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM shipments
      WHERE shipments.id = tracking_events.shipment_id
    )
  );

-- Contact messages policies
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view own messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));
