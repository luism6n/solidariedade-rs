import Header from "@/components/Header";

export default function Layout({
  children,
  props,
}: {
  children: React.ReactNode;
  props: {
    headerProps: React.ComponentProps<typeof Header>;
  };
}) {
  return (
    <div className="flex flex-col h-screen bg-mbp-gray">
      <Header {...props.headerProps} />
      <div className="p-lg flex flex-col gap-md flex-1">{children}</div>
    </div>
  );
}
