"use client"

import PageHeader from "../components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivePage,
  resetActivePage,
  updateActivePageField,
} from "@/slices/seoSlice";

export default function Page() {
  const dispatch = useDispatch();
  const savedPages = useSelector((state) => state.pages.pages);
  const form = useSelector((state) => state.pages.active);
  const [search, setSearch] = useState("");

  const filteredPages = savedPages.filter(
    (page) =>
      page.title.toLowerCase().includes(search.toLowerCase()) ||
      page.description.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageClick = (page) => {
    dispatch(setActivePage({
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      url: page.url
    }));
  };

  const handleChange = (e) => {
    dispatch(updateActivePageField({ field: e.target.id, value: e.target.value }));
  };

  return (
    <>
      <div>
        <div className="p-4">
          <PageHeader />
        </div>
        <div className="flex flex-col items-center justify-center mt-5 p-3 md:p-5">
          <div className="w-full max-w-sm md:max-w-3xl">
            <Card className="overflow-hidden py-0">
              <CardContent className="grid p-5 md:grid-cols-2">
                {/* Sidebar Section */}
                <div className="relative hidden md:block p-2">
                  <div className="w-full  pr-2">
                    <h2 className="text-lg font-semibold">Saved Pages</h2>
                    <Input
                      type="text"
                      placeholder="Search pages..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="mb-2"
                    />
                    <ul className="space-y-2 h-full max-h-[370px] overflow-y-auto">
                      {filteredPages.map((page) => (
                        <li
                          key={page.id}
                          onClick={() => handlePageClick(page)}
                          className="cursor-pointer rounded border p-3 hover:bg-muted"
                        >
                          <div className="text-sm font-medium">
                            <span className="flex text-xs text-muted">{page.url}</span>
                            {page.title}
                          </div>
                          <div className="text-xs text-muted-foreground">{page.description}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Form Section */}
                <div className="flex flex-col gap-6 p-4 bg-muted rounded max-h-[540px] overflow-y-auto">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold">{ (form.id & form.id > 0) ? "Update" : "Create"} Page SEO</h1>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={form?.title || ""}
                      onChange={handleChange}
                      placeholder="Page title"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={form?.description || ""}
                      onChange={handleChange}
                      placeholder="Page description"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      value={form?.keywords || ""}
                      onChange={handleChange}
                      placeholder="Comma-separated keywords"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={form?.url || ""}
                      onChange={handleChange}
                      placeholder="Url"
                      required
                    />
                  </div>

                  <div className="grid gap-2 md:grid-cols-2">
                    <Button
                      type="button"
                      className="w-full bg-gray-500 flex-col"
                      onClick={() => dispatch(resetActivePage())}
                    >
                      Reset
                    </Button>
                    <Button type="submit" className="w-full flex-col">
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}