CREATE INDEX "wallet_address_idx" ON "users" USING btree ("wallet_address");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_student_nft_id_unique" UNIQUE("student_nft_id");