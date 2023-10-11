import * as React from "react";

import Button from "~/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/Card";
import Input from "~/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/Select";

import { Container } from "~/components";

export default function Index() {
  const [ticket, setticket] = React.useState("");
  const [facilitatorName, setfacilitatorName] = React.useState("");
  const [succesfulSubmission, setsuccesfulSubmission] = React.useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`/api/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticket, facilitatorName }),
    });
    if (response.ok) {
      setsuccesfulSubmission(true);
      setticket("");
      setfacilitatorName("");
    }
  };
  return (
    <Container>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Submit a Query</CardTitle>
          <CardDescription>
            Submit your query to the facilitator for review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  placeholder="Name of facilitator"
                  onChange={(e) => setfacilitatorName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="ticket">Ticket</label>
                <Select onValueChange={(value) => setticket(value)}>
                  <SelectTrigger id="ticket">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="deadlineExtension">
                      Deadline Extension
                    </SelectItem>
                    <SelectItem value="assignmentResubmission">
                      Assignment Resubmission
                    </SelectItem>
                    <SelectItem value="assignmentReview">
                      Assignment review
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter className="mt-5 flex justify-between">
              <Button variant="destructive" size="lg">
                Cancel
              </Button>
              <Button variant="secondary" size="lg" type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      {succesfulSubmission && <h3>Submitted Succesfully</h3>}
    </Container>
  );
}
