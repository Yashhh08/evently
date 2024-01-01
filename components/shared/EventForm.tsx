"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "../ui/calendar";
import Image from "next/image";
import { Badge } from "../ui/badge";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { categories } from "@/constants/categories";
import { createEvent } from "@/lib/actions/event.action";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { th } from "date-fns/locale";

const formSchema = z.object({
  title: z.string().trim().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.string(),
  tags: z
    .array(z.string().min(2, { message: "Tag must be at least 2 characters." }))
    .min(1, { message: "At least one tag is required." }),
  description: z.string().trim().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  photo: z.string(),
  isOnline: z.boolean().optional(),
  location: z.string().trim().optional(),
  landmark: z.string().trim().optional(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.string().trim().optional(),
  // isMultipleDays: z.boolean(),
  totalCapacity: z.string().trim().optional(),
  isFree: z.boolean(),
  price: z.string().trim().optional(),
  ageRestriction: z.string().trim().optional(),
  url: z.string().trim().optional(),
});

interface Props {
  userId: string;
  type?: string;
}

const EventForm = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: undefined,
      tags: [],
      description: "",
      photo: undefined,
      isOnline: false,
      location: "",
      landmark: "",
      startDate: undefined,
      endDate: undefined,
      startTime: undefined,
      endTime: undefined,
      duration: undefined,
      // isMultipleDays: false,
      totalCapacity: undefined,
      isFree: false,
      price: undefined,
      ageRestriction: undefined,
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    let uploadedImageUrl = values.photo;

    try {
      if (files.length > 0) {
        const uploadedImages = await startUpload(files);

        if (!uploadedImages) {
          throw new Error("Please upload a valid image below of 4MB.");
        }

        uploadedImageUrl = uploadedImages[0].url;
      }

      const event = await createEvent({
        title: values.title,
        category: values.category,
        description: values.description,
        photo: uploadedImageUrl,
        isOnline: values.isOnline,
        location: values.location,
        landmark: values.landmark,
        startDate: values.startDate,
        endDate: values.endDate,
        startTime: values.startTime,
        endTime: values.endTime,
        duration:
          values.duration === undefined ? values.duration : +values.duration,
        // isMultipleDays: values.isMultipleDays ,
        totalCapacity:
          values.totalCapacity === undefined
            ? values.totalCapacity
            : +values.totalCapacity,
        isFree: values.isFree,
        price: values.price === undefined ? values.price : +values.price,
        tags: values.tags,
        ageRestriction:
          values.ageRestriction === undefined
            ? values.ageRestriction
            : +values.ageRestriction,
        url: values.url,
        organizer: props.userId,
      });

      form.reset();

      router.push(`/event/${event._id}`);

      toast({
        title: "Success!",
        description: "Event created successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, field: any) => {
    if (
      (e.key === "Enter" && field.name === "tags") ||
      (e.key === "," && field.name === "tags")
    ) {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim().toLowerCase();

      if (tagValue.length > 15) {
        return form.setError("tags", {
          type: "required",
          message: "Max length should not exceed 15 characters",
        });
      }

      if (!field.value.includes(tagValue)) {
        form.setValue("tags", [...field.value, tagValue]);
        tagInput.value = "";
        form.clearErrors("tags");
      } else {
        form.setError("tags", {
          type: "validate",
          message: "Alredy exist",
        });
        form.trigger();
      }
    }
  };

  const removeTagHandler = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <h1 className="text-4xl max-sm:text-2xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent mb-5">
        {props.type === "edit" ? "Update Event" : "Create Event"}
      </h1>
      <br />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-10 max-sm:p-4"
      >
        <div className="flex justify-around items-center gap-10 max-sm:flex-col">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Title <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl className="flex flex-auto">
                  <Input
                    placeholder="Write a catchy title for your event."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-1.5">
                <FormLabel>
                  Category <span className="text-red-700">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.title === field.value
                            )?.title
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup className="h-52 overflow-auto">
                        {categories.map((category) => (
                          <CommandItem
                            value={category.title}
                            key={category.title}
                            onSelect={() => {
                              form.setValue("category", category.title);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.title === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tags <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Textarea
                    disabled={props.type === "edit"}
                    onKeyDown={(e) => handleKeyDown(e, field)}
                    className="min-h-min"
                    // placeholder="Add tags and press enter or `,` to add them."
                  />

                  {field.value.length > 0 && (
                    <div className="flex justify-start items-center gap-2 flex-wrap uppercase">
                      {field.value.map((tag) => {
                        return (
                          <Badge key={tag}>
                            {tag}
                            {props.type !== "edit" && (
                              <Image
                                src={"/images/close.svg"}
                                alt="close"
                                height={12}
                                width={12}
                                className="ml-1 hover:cursor-pointer"
                                onClick={() => removeTagHandler(tag, field)}
                              />
                            )}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription>
                Add atleast 1 tag to describe what your event is about. You need
                to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-around items-start gap-10 max-sm:flex-col">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Description <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl className="flex flex-auto">
                  <Textarea
                    className="h-72 max-sm:h-auto"
                    placeholder="Write description of the event in details."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Photo <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  {/* <Input placeholder="A photo for the event." {...field} /> */}
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className=" flex flex-col gap-5 w-[240px]">
          <FormField
            control={form.control}
            name="isOnline"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Is Online?</FormLabel>
                <FormControl>
                  <Checkbox
                    id="isOnline"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    className="ml-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!form.getValues().isOnline ? (
            <div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="The location of the event."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landmark</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="The landmark of the event."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-wrap gap-5 justify-between items-start max-sm:flex-col">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Start Date <span className="text-red-700">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  End Date <span className="text-red-700">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < form.getValues().startDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Start Time <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="time" id="startTime" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  End Time <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    id="endTime"
                    // min={form.getValues().startTime }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (Minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="The duration of the event"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="isMultipleDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recurring Daily for Selected Dates?</FormLabel>
                <FormControl>
                  <Checkbox
                    id="isMultipleDays"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    className="ml-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <FormField
          control={form.control}
          name="totalCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Total sitting Capacity of venue{" "}
                {/* <span className="text-red-700">*</span> */}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="The total number of people that can attend the event."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Free?</FormLabel>
                <FormControl>
                  <Checkbox
                    id="isFree"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    className="ml-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!form.getValues().isFree ? (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="The price of the event in INR."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            ""
          )}
        </div>

        <FormField
          control={form.control}
          name="ageRestriction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Restriction</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Minimum age required to attend the event."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"url"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="The URL of the event."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center items-center">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? props.type === "edit"
                ? "Updating..."
                : "Creating..."
              : props.type === "edit"
              ? "Update Event"
              : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
