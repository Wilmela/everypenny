"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSchema, SearchType } from "@/lib/validation";
import { useDebouncedCallback } from "use-debounce";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ButtonGradientWrapper } from "../blocks/ButtonGradientWrapper";

const SearchForm = () => {
  const initialValue = { search: "" };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<SearchType>({
    defaultValues: initialValue,
    resolver: zodResolver(SearchSchema),
  });

  const onSubmit = useDebouncedCallback((data: SearchType) => {
    if (!data.search) return;
    const params = new URLSearchParams(searchParams);
    if (data.search) {
      params.set("query", data.search);
    } else {
      params.delete("query");
    }

    // Replaces the current dashboard pathname to include the query key and value
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-2 items-center md:justify-end w-full"
      >
        <FormField
          name="search"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormMessage />
              <FormControl>
                <Input
                  defaultValue={searchParams.get("query")?.toString()}
                  {...field}
                  placeholder="Search"
                  className={cn("form-input md:w-[17rem]")}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <ButtonGradientWrapper>
          <Button className="rounded-full py-[1.4rem] w-fit" type="submit">
            Search
          </Button>
        </ButtonGradientWrapper>
      </form>
    </Form>
  );
};

export default SearchForm;
