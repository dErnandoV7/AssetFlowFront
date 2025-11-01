
export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Página Privada</h1>
      {children}
    </div>
  );
}
